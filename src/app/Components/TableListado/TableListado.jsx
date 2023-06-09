import { useGetProducts } from "@/api/api";
import React from "react";
import Loading from "../Loading/Loading";
import { Carousel } from "../Carousel/Carousel";
import "./tableListado.css"

export default function TableListado() {

    const { data: product, isLoading, isError, error } = useGetProducts()
  
    if (isLoading) return <Loading/>
    if (isError) return <div>Error: {error.message}</div>

  return (
    <table>
      <colgroup>
        <col className="column-id" />
        <col className="column-title" />
        <col className="column-description" />
        <col className="column-price" />
        <col className="column-discount" />
        <col className="column-rating" />
        <col className="column-stock" />
        <col className="column-brand" />
        <col className="column-category" />
        <col className="column-image" />
      </colgroup>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>% OFF</th>
          <th>Calificación</th>
          <th>Stock</th>
          <th>Marca</th>
          <th>Categoría</th>
          <th>Imagen</th>
        </tr>
      </thead>
      <tbody>
        {product &&
          product.products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
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
            </tr>
          ))}
      </tbody>
    </table>
  );
}