import { useGetProducts } from "@/api/api";
import "./formCrearProducto.css";
import { useForm } from "react-hook-form";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";

export default function FormCrearProducto() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({onChange: true});

  const { data: products, isLoading, isError, error } = useGetProducts()
  
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCreatingNewBrand, setIsCreatingNewBrand] = useState(false);
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  const [brandExists, setBrandExists] = useState(false);
  const [categoryExists, setCategoryExists] = useState(false);

  useEffect(() => {
    if (products) {
      const uniqueBrands = [...new Set(products.products.map(item => item.brand))];
      const uniqueCategories = [...new Set(products.products.map(item => item.category))];
      setBrands(uniqueBrands);
      setCategories(uniqueCategories);
    }
  }, [products]);

  useEffect(() => {
    if (isCreatingNewBrand) {
      setBrandExists(brands.includes(watch("brand")));
    } else {
      setBrandExists(false);
    }
  }, [watch("brand"), brands, isCreatingNewBrand]);

  useEffect(() => {
    if (isCreatingNewCategory) {
      setCategoryExists(categories.includes(watch("category")));
    } else {
      setCategoryExists(false);
    }
  }, [watch("category"), categories, isCreatingNewCategory]);

  const toggleInputBrand = () => {
    setIsCreatingNewBrand(!isCreatingNewBrand);
  };

  const toggleInputCategory = () => {
    setIsCreatingNewCategory(!isCreatingNewCategory);
  };

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
          <label>Titulo</label>
          <input
            {...register("title", { required: true })}
            placeholder="Titulo"
            className="form-control"
          />
          {errors.title && (
            <small className="errorFormCrearProducto">Este campo es requerido.</small>
          )}
        </div>
        <div>
          <label>Imagen (URL)</label>
          <input
            {...register("image", { required: true })}
            placeholder="Imagen (URL)"
            className="form-control"
          />
          {errors.image && (
            <small className="errorFormCrearProducto">Este campo es requerido.</small>
          )}
        </div>
      </div>

      <div className="formGroup">
        <div>
          <label>Precio</label>
          <input
            {...register("price", { required: true })}
            placeholder="Precio"
            type="number"
            className="form-control"
            onWheel={(e) => e.target.blur()}
          />
          {errors.price && (
            <small className="errorFormCrearProducto">Este campo es requerido.</small>
          )}
        </div>
        <div>
          <label>Portentaje de Descuento</label>
          <input
            {...register("discountPercentage", { required: true })}
            placeholder="Portentaje de Descuento"
            type="number"
            className="form-control"
            onWheel={(e) => e.target.blur()}
          />
          {errors.discountPercentage && (
            <small className="errorFormCrearProducto">Este campo es requerido.</small>
          )}
        </div>
      </div>

      <div className="formGroup">
        <div>
          <label>Calificación</label>
          <input
            {...register("rating", { required: true })}
            placeholder="Calificación"
            type="number"
            step="0.01"
            min="0"
            max="5"
            className="form-control"
          />
          {errors.rating && (
            <small className="errorFormCrearProducto">Este campo es requerido.</small>
          )}
        </div>
        <div>
          <label>Stock</label>
          <input
            {...register("stock", { required: true })}
            placeholder="Stock"
            type="number"
            className="form-control"
            onWheel={(e) => e.target.blur()}
          />
          {errors.stock && (
            <small className="errorFormCrearProducto">Este campo es requerido.</small>
          )}
        </div>
      </div>

      <div className="formGroup">
        <div>
          <label>Marca</label>
          {isCreatingNewBrand ? (
          <input
            {...register("brand", { required: true })}
            placeholder="Marca"
            className="form-control"
          />
          ) : (
            <select
            className="form-control"
            name="brand"
            {...register("brand", { required: true })}
          >
            <option value="">Selecciona una marca</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        )}
        <button type="button" onClick={toggleInputBrand}>
          {isCreatingNewBrand ? 'Seleccionar marca existente' : 'Crear nueva marca'}
        </button>
          {brandExists && <small className="errorFormCrearProducto">Esta marca ya existe.</small>}
          {errors.brand && (
            <small className="errorFormCrearProducto">Este campo es requerido.</small>
          )}
        </div>
        <div>
          <label>Categoría</label>
          {isCreatingNewCategory ? (
          <input
            {...register("category", { required: true })}
            placeholder="Categoría"
            className="form-control"
          />
          ) : (
            <select
            className="form-control"
            name="category"
            {...register("category", { required: true })}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}
        <button type="button" onClick={toggleInputCategory}>
          {isCreatingNewCategory ? 'Seleccionar categoría existente' : 'Crear nueva categoría'}
        </button>
          {categoryExists && <small className="errorFormCrearProducto">Esta categoría ya existe.</small>}
          {errors.category && (
            <small className="errorFormCrearProducto">Este campo es requerido.</small>
          )}
        </div>
      </div>

      <div className="formGroupLast">
        <label>Descripción</label>
        <textarea
          {...register("description", { required: true, maxLength: 150 })}
          placeholder="Máximo 150 caracteres"
          className="form-control"
        />
        {errors.description && (
          <small className="errorFormCrearProducto">
            Este campo es requerido y no debe exceder los 150 caracteres.
          </small>
        )}
      </div>
      <div className="containerButtonForm">
        <button type="button" onClick={() => reset()} >Cancelar</button>
        <button disabled={brandExists || categoryExists} type="submit">
          Guardar
        </button>
      </div>
    </form>
  );
}
