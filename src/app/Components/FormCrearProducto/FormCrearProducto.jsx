import { useGetProducts } from "@/api/api";
import "./formCrearProducto.css";
import { useForm } from "react-hook-form";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";
import { Carousel } from "../Carousel/Carousel";

export default function FormCrearProducto() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({onChange: true});

  const { data: products, isLoading, isError, error } = useGetProducts()

  const handleProductSelect = (e) => {
    const product = products.products.find(p => p.title === e.target.value);
    setSelectedProduct(product);
  }

  const onSubmit = (data) => {
    console.log(data);
    const existingFacturas = JSON.parse(localStorage.getItem("facturas")) || [];
    const newFacturas = [...existingFacturas, data];
    localStorage.setItem("facturas", JSON.stringify(newFacturas));
    reset()
  };

  if (isLoading) return <Loading/>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <form className="formCrearProducto" onSubmit={handleSubmit(onSubmit)}>
      <div className="formGroup">
        <div>
          <label>Nombre del cliente</label>
          <input
            {...register("clientName", { required: true })}
            placeholder="Nombre del cliente"
            className="form-control"
          />
          {errors.clientName && (
            <small className="errorFormCrearProducto">Este campo es requerido.</small>
          )}
        </div>
        <div>
          <label>Fecha</label>
          <input
            {...register("fecha", { required: true })}
            placeholder="Fecha"
            className="form-control"
          />
          {errors.fecha && (
            <small className="errorFormCrearProducto">Este campo es requerido.</small>
          )}
        </div>
      </div>

      <div className="formGroup">
        <div>
          <label>Total</label>
          <input
            {...register("total", { required: true })}
            placeholder="Total"
            type="number"
            className="form-control"
            onWheel={(e) => e.target.blur()}
          />
          {errors.total && (
            <small className="errorFormCrearProducto">Este campo es requerido.</small>
          )}
        </div>
      </div>

      <div className="containerButtonForm">
        <button type="button" onClick={() => reset()} >Cancelar</button>
        <button type="submit">Guardar</button>
      </div>

    </form>
  );
}
