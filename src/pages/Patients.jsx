import React, { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Global/Title";
import Layout from "../layout/Layout";
import { readPatients } from "../redux/actions/patiences";
import { Link } from "react-router-dom";
import InputSearch from "../components/Global/InputSearch";
import { readEmployeById } from "../redux/actions/employee";
const Table = React.lazy(() => import("../components/Global/Table"));
const Pagination = React.lazy(() => import("../components/Global/Pag"));
const TableContent = React.lazy(() =>
  import("../components/Patients/TableContent")
);

export default function Patients() {
  //react states logic
  const [search, setSearch] = useState({ name: "", custom: "", exp: "" });
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [state, setState] = useState(true);

  //redux get states
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patient.data);
  const user = useSelector((state) => state.user.data);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    return dispatch(readEmployeById(auth?.user?.userid));
  }, [dispatch, auth]);
  //redux dispatch states
  useEffect(() => {
    setReload(false);
    dispatch(
      readPatients(
        page,
        search.name,
        search.custom,
        search.exp,
        25,
        state ? 1 : 0
      )
    );
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, reload, state]);
  const handleChange = (e) => {
    setSearch({ ...search, [e.currentTarget.name]: e.currentTarget.value });
    setPage(1);
  };
  return (
    <Layout>
      <div className="p-8">
        <Title name="Listado de Pacientes" />
        <div className="grid grid-cols-3 gap-4">
          <InputSearch
            label="Buscar por el nombre de la mascota"
            placeholder="Escribe el nombre de la mascota..."
            name="name"
            handleChange={(e) => handleChange(e)}
          />
          <InputSearch
            label="Buscar por el dueño de la mascota"
            placeholder="Escribe el nombre del dueño de la mascota..."
            handleChange={(e) => handleChange(e)}
            name="custom"
          />
          <InputSearch
            label="Buscar por numero de expediente"
            placeholder="Escribe el numero de expediente..."
            name="exp"
            handleChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label className="text-xs">Mostrar</label>
          <div className="text-xl font-semibold flex mt-1">
            <div className="relative mt-1 ml-3 inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                nameName="toggle"
                id="toggle"
                checked={state}
                onClick={() => setState(!state)}
                className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                for="toggle"
                className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
            <span className="text-sm font-normal text-gray-600 mt-1">
              {state ? "Activos" : "Inactivos"}
            </span>
          </div>
        </div>
        <button className="bg-blue-600 text-white mt-3 px-8 ml-4 float-right text-xs py-1 rounded">
          <Link to="/new-patient">Agregar</Link>
        </button>
        <Suspense fallback={<Waiting />}>
          <Table>
            <TableContent
              setState={setState}
              user={user?.users}
              setReload={setReload}
              patients={patients}
            />
          </Table>
          <Pagination
            pageSize={patients?.take}
            currentPage={patients?.currentPage}
            data={patients}
            totalCount={patients?.totalItems}
            last={patients?.totalpages}
            onPageChange={setPage}
          />
        </Suspense>
      </div>
    </Layout>
  );
}

function Waiting() {
  return (
    <div className="py-8 px-5 rounded-lg flex items-center">
      <div className="text-gray-500 text-md font-semibold text-center">
        Cargando resultados...
      </div>
      <div className="loader-dots block relative w-32 h-5 ml-8">
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-500"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-500"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-500"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-500"></div>
      </div>
    </div>
  );
}
