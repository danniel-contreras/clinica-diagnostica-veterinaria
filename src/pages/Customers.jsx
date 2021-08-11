import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Customers/Form";
import TableContent from "../components/Customers/TableContent";
import Modal from "../components/Global/Modal";
import Pagination from "../components/Global/Pagination";
import Table from "../components/Global/Table";
import Title from "../components/Global/Title";
import Layout from "../layout/Layout";
import { readCustomers } from "../redux/actions/customers";

export default function Customers() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  const [last, setLast] = useState();
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();
  const customers = useSelector((state)=>state.customer.data)
  useEffect(() => {
    return dispatch(readCustomers(name,last,page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name,last,page]);
  return (
    <Layout>
      <div className="p-5">
        <Title name="Listado de Clientes" />
        <div>
          <input
            className="border outline-none text-xs py-1 w-64 px-4 rounded"
            placeholder="Escribe el nombre para buscar"
            onChange={(e)=>setName(e.currentTarget.value)}
          />
           <input
            className="border outline-none text-xs py-1 ml-6 w-64 px-4 rounded"
            placeholder="Escribe el apellido para buscar"
            onChange={(e)=>setLast(e.currentTarget.value)}
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-8 ml-4 float-right text-xs py-1 rounded"
        >
          Agregar
        </button>
        <Modal
          title="Agregar Cliente"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <Form setShowModal={setShowModal} />
        </Modal>
        <Table>
          <TableContent customers={customers.customers} />
        </Table>
        <Pagination data={customers} method={setPage} />
      </div>
    </Layout>
  );
}
