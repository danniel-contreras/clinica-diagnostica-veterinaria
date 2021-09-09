import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Success } from "../../Global/Alerts/Success";
import { Error } from "../../Global/Alerts/Error";
import { addNewQuoteType } from "../../../services/quote-type";
import { addQuoteType } from "../../../redux/actions/quote-type";
import { putQuoteType } from "../../../services/quote-type";

export default function Form({ setShowModal, qtype }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: initialValues(qtype),
    validationSchema: Yup.object({
      type: Yup.string().required(
        "El nombre del tipo de consulta es requerido"
      ),
    }),
    onSubmit: (values) => {
      if (qtype) {
        putQuoteType(values, qtype?.id)
          .then(() => {
            dispatch(addQuoteType(values));
            setShowModal(false);
            Success("Se actualizo el tipo de servicio");
          })
          .catch(() => {
            Error("Ah ocurrido un error inesperado");
          });
        return;
      }
      addNewQuoteType(values)
        .then(() => {
          dispatch(addQuoteType(values));
          setShowModal(false);
          Success("Se agrego el tipo de servicio");
        })
        .catch(() => {
          Error("Ah ocurrido un error inesperado");
        });
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col p-1 mt-1">
          <label className="text-sm text-gray-400">Nombre</label>
          <input
            type="text"
            name="type"
            onChange={formik.handleChange}
            placeholder="Ingresa el nombre del tipo de consulta"
            defaultValue={qtype && qtype?.type}
            className={
              "w-80 border p-1 text-sm rounded text-gray-500 px-2 outline-none hover:border-green-400 " +
              (formik.errors.type && formik.touched.type
                ? "border-red-400"
                : "border-gray-300")
            }
          />
          {formik.errors.type && formik.touched.type && (
            <span className="text-sm font-normal text-red-400">
              {formik.errors.type}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 mt-4 w-full text-white rounded px-12 py-1 text-xs"
        >
          {qtype ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </div>
  );
}

function initialValues(qtype) {
  return {
    type: "" || qtype?.type,
  };
}
