import { useGetAddedToInvoice, useGetProducts } from "@/api/api";
import React, { useState } from "react";
import Loading from "../Loading/Loading";
import { Carousel } from "../Carousel/Carousel";
import "./tableListado.css"
import { useQueryClient } from "@tanstack/react-query";

export default function TableListado() {
    const queryClient = useQueryClient();
    const { data: product, isLoading, isError, error } = useGetProducts()
    const { data: addedToInvoice } = useGetAddedToInvoice();

    
    if (isLoading) return <Loading/>
    if (isError) return <div>Error: {error.message}</div>

    const addToInvoice = (productId) => {
      if (!addedToInvoice.includes(productId)) {
          queryClient.setQueryData(['getAddedToInvoice'], (oldData = []) => [...oldData, productId]);
      }
  };
  
  return (
    <table>
      <colgroup>
        <col className="column-title" />
        <col className="column-description" />
        <col className="column-price" />
        <col className="column-discount" />
        <col className="column-rating" />
        <col className="column-stock" />
        <col className="column-brand" />
        <col className="column-category" />
        <col className="column-image" />
        <col className="column-add-to-invoice" />
      </colgroup>
      <thead>
        <tr>
          <th>Título</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>% OFF</th>
          <th>Calificación</th>
          <th>Stock</th>
          <th>Marca</th>
          <th>Categoría</th>
          <th>Imagen</th>
          <th>Agregar a Factura</th>
        </tr>
      </thead>
      <tbody>
        {product &&
          product.products.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td className="description">{p.description}</td>
              <td>{p.price}</td>
              <td>{p.discountPercentage}</td>
              <td>{p.rating}</td>
              <td>{p.stock}</td>
              <td>{p.brand}</td>
              <td>{p.category}</td>
              <td>
                <Carousel images={p.images} />
              </td>
              <td>
                <button className="invoice-button" onClick={() => addToInvoice(p.id)}>
                    {addedToInvoice.includes(p.id) ? "Añadido" : "+"}
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
