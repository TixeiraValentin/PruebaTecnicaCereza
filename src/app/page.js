'use client'
import { useGetProducts } from "@/api/api"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Carousel } from "./Components/Carousel/Carousel"


export default function Home() {
  const queryClient = useQueryClient()
  const { data: product, isLoading: isLoadingRandomUser, isError, error } = useGetProducts()


  const handleInvalidQuery = (e) => {
    queryClient.invalidateQueries(['getProducts'])
  }

  if (isLoadingRandomUser) return <div>Cargando...</div>
  if (isError) return <div>Error: {error.message}</div>

  console.log({ product })

  return (
    <>
      <div className="containerHome">
        <header>
          <h1>Gestión de Facturas</h1>
        </header>
        <main className="containerMainHome">
          <section className="containerSectionFirstHome">
            <h2>Listado de Facturas</h2>
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
                {product && product.products.map(p => (
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
                      <Carousel images={p.images}/>
                    </td>
                  </tr> 
                ))}
              </tbody>
            </table>
          </section>
          <section>
            <h2>Crear Nueva Factura</h2>
            <form>
              <label htmlFor="cliente">Cliente:</label>
              <input type="text" id="cliente" name="cliente" required />

              <label htmlFor="fecha">Fecha:</label>
              <input type="date" id="fecha" name="fecha" required />

              <label htmlFor="total">Total:</label>
              <input type="number" id="total" name="total" required />

              <button type="submit">Crear Factura</button>
            </form>
          </section>
        </main>
      </div>
    </>
  )
}
