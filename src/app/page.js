'use client'

import { useState } from "react"
import TableListado from "./Components/TableListado/TableListado"
import FormCrearProducto from "./Components/FormCrearProducto/FormCrearProducto"


export default function Home() {
  //const queryClient = useQueryClient()
  const [showTable, setShowTable] = useState(true)

  const handleInvalidQuery = () => {
    setShowTable(false)
    //queryClient.invalidateQueries(['getProducts'])
  }
  return (
    <>
      <div className="containerHome">
        <header>
          <h1>Gestión de Facturas</h1>
        </header>
        <main className="containerMainHome">
          <section className="containerSectionFirstHome">
            <div className="headerSectionFirstHome">
              <h2 onClick={() => setShowTable(true)}>Listado de Facturas</h2>
              <h2 onClick={() => handleInvalidQuery()}>Generar nueva Factura</h2>
            </div>
            {showTable ? 
              <TableListado /> : 
              <FormCrearProducto/>
            }
          </section>
        </main>
      </div>
    </>
  )
}
