import { useGetAddedToInvoice, useGetProducts } from "@/api/api";
import "./formCrearProducto.css";
import { Controller, useForm } from "react-hook-form";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";
import es from "date-fns/locale/es";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FormCrearProducto() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({ onChange: true });

  const { data: products, isLoading, isError, error } = useGetProducts();
  const { data: addedToInvoice } = useGetAddedToInvoice();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (products && addedToInvoice) {
      const matchedProducts = products.products.filter((product) =>
        addedToInvoice.includes(product.id)
      );
      setSelectedProducts(matchedProducts);
    }
  }, [products, addedToInvoice]);

  const onSubmit = (data) => {
    console.log(data);
    const existingFacturas = JSON.parse(localStorage.getItem("facturas")) || [];
    const newFacturas = [...existingFacturas, data];
    localStorage.setItem("facturas", JSON.stringify(newFacturas));
    reset();
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  registerLocale("es", es);

  return (
    <form className="formCrearProducto" onSubmit={handleSubmit(onSubmit)}>
      <div className="containerSelectedProducts">
        <label>Productos</label>
        <div className="containerCardsSelectProducts">
          {selectedProducts &&
            selectedProducts.map((product, index) => (
              <div className="cardSelectProducts" key={index}>
                <div>
                  <img src={product.thumbnail} alt={product.title} />
                </div>
                <div>
                  <h3>{product.title}</h3>
                  <p>Precio: {product.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="formGroup">
        <div>
          <label>Nombre del cliente</label>
          <input
            {...register("clientName", { required: true })}
            placeholder="Nombre del cliente"
            className="form-control"
          />
          {errors.clientName && (
            <small className="errorFormCrearProducto">
              Este campo es requerido.
            </small>
          )}
        </div>
      </div>

      <div className="containerFechaCreateFactura">
          <label>Fecha</label>
          <Controller
            name="fecha"
            control={control}
            defaultValue={new Date()}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                locale="es"
              />
            )}
          />

          {errors.fecha && (
            <small className="errorFormCrearProducto">
              Este campo es requerido.
            </small>
          )}
        </div>

      <div className="totalFactura">
        <label>Total</label>
        <div>
          {selectedProducts.reduce(
            (total, product) => total + product.price,
            0
          )}
        </div>
      </div>

      <div className="containerButtonForm">
        <button type="button" onClick={() => reset()}>
          Cancelar
        </button>
        <button type="submit">Guardar</button>
      </div>
    </form>
  );
}
