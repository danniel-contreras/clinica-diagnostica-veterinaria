import { useState, useEffect, useCallback } from "react";
import Title from "../components/Global/Title";
import Layout from "../layout/Layout";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Global/Modal";
import SelectPatient from "../components/Quotes/SelectPatient";
import { readPatients } from "../redux/actions/patiences";
import SelectDoctor from "../components/Quotes/SelectDoctor";
import { readDoctors } from "../redux/actions/doctors";
import { validateDate } from "../utils/dates";
import { Warning } from "../components/Global/Alerts/Warning";
import { addNewQuote } from "../services/quotes";
import { Success } from "../components/Global/Alerts/Success";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import { addQuote } from "../redux/actions/quote";

const AddQuote = () => {
  //react useStates login
  const [showModalSelectPat, setShowModalSelectPat] = useState(false);
  const [showModalSelectDoc, setShowModalSelectDoc] = useState(false);
  const [patientToQuote, setPatientToQuote] = useState();
  const [doctorToQuote, setDoctorToQuote] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  //Redux login
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patient.data);
  const doctors = useSelector((state) => state.doctor.data);

  //socket io logic
  const serverURL = "http://localhost:8000";
  const socket = io(serverURL, {
    withCredentials: true,
  });
  const callSocket = useCallback(() => {
    socket.emit("new", "A new order is added");
  }, [socket]);
  //react router dom logic
  const router = useHistory();

  //Formik logic
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object({
      date: yup.date().required("La fecha de la consulta es requerida"),
      issue: yup
        .string()
        .required("Desde escribir la descripcion del problema"),
    }),
    onSubmit: (values) => {
      if (validateDate(values.date)) {
        if (patientToQuote) {
          if (doctorToQuote) {
            const newData = {
              ...values,
              patientsId: patientToQuote?.id,
              doctorsId: doctorToQuote?.id,
            };
            addNewQuote(newData).then(() => {
              callSocket();
              Success("Se guardo el registro");
              dispatch(addQuote(newData));
              router.push("/quotes");
            });
            return;
          }
          Warning("Debes seleccionar un doctor");
          return;
        }
        Warning("Debes seleccionar un paciente");
        return;
      }
      Warning("No puedes seleccionar una fecha anterior");
    },
  });

  //react useEffect logic
  useEffect(() => {
    dispatch(readPatients(1, "", "", 3));
    dispatch(readDoctors());
    return;
  }, [dispatch, search, page]);
  return (
    <Layout>
      <div className="p-10">
        <Title name="Agregar nueva consulta" />
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 p-20 shadow w-full">
            <div className="m-4">
              <div className="flex flex-col">
                <label>Fecha de consulta</label>
                <input
                  name="date"
                  onChange={formik.handleChange}
                  type="date"
                  className="border rounded text-xs py-1 px-2 outline-none mt-2"
                />
              </div>
              <div className="flex flex-col">
                <label>Descripcion del problema</label>
                <textarea
                  name="issue"
                  onChange={formik.handleChange}
                  cols={4}
                  rows={7}
                  className="border rounded text-xs py-1 px-2 outline-none mt-2"
                  placeholder="Escribe la descripcion del problema"
                />
              </div>
            </div>
            <div className="m-4">
              <div className="flex flex-col">
                <label>Paciente</label>
                <input
                  disabled
                  defaultValue={patientToQuote && patientToQuote?.names}
                  className="border rounded text-xs py-1 px-2 outline-none mt-2"
                />
                <button
                  type="button"
                  onClick={() => setShowModalSelectPat(true)}
                  className="bg-green-500 font-medium text-white py-2 text-xs rounded mt-4"
                >
                  Seleccionar paciente
                </button>
              </div>
              <div className="flex flex-col">
                <label>Doctor</label>
                <input
                  defaultValue={doctorToQuote && doctorToQuote.users?.names}
                  disabled
                  className="border rounded text-xs py-1 px-2 outline-none mt-2"
                />
                <button
                  type="button"
                  onClick={() => setShowModalSelectDoc(true)}
                  className="bg-green-500 font-medium text-white py-2 text-xs rounded mt-4"
                >
                  Seleccionar doctor
                </button>
              </div>
            </div>
            <div />
            <button
              type="submit"
              className="bg-blue-500 font-medium text-white py-2 text-xs rounded mt-4"
            >
              Guardar
            </button>
          </div>
        </form>
        <Modal
          showModal={showModalSelectPat}
          setShowModal={setShowModalSelectPat}
          title="Seleccionar paciente"
        >
          <SelectPatient
            setPatientToQuote={setPatientToQuote}
            setPage={setPage}
            setSearch={setSearch}
            patients={patients}
            setShowModalSelectPat={setShowModalSelectPat}
          />
        </Modal>
        <Modal
          showModal={showModalSelectDoc}
          setShowModal={setShowModalSelectDoc}
          title="Seleccionar doctor"
        >
          <SelectDoctor
            setDoctorToQuote={setDoctorToQuote}
            setShowModalSelectDoc={setShowModalSelectDoc}
            doctors={doctors}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default AddQuote;

function initialValues() {
  return {
    date: "",
    issue: "",
  };
}
