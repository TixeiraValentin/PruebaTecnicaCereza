"use client"

import "./facturas.css"

export default function page() {

    const facturas = JSON.parse(localStorage.getItem('facturas')) || [];

    return (

        <div className='containerFacturas'>
            <h1>Listado de Facturas</h1>
            {facturas.map((factura, index) => (
                <div className="containerFacturaAndProduct" key={index}>
                    <div className="factura">
                        <h2>Factura #{index + 1}</h2>
                        <p>Fecha: {factura.fecha}</p>
                        <p>Nombre del cliente: {factura.clientName}</p>
                        <h2>Total: {factura.total}</h2>
                    </div>
                    <div className="factura">
                        <h2>Productos:</h2>
                        {factura.selectedProducts.map((product, pIndex) => (
                            <div key={pIndex}>
                                <h3>{product.title}</h3>
                                <p>Precio: {product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
