import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Colors/Form";
import TableContent from "../components/Colors/TableContent";
import Modal from "../components/Global/Modal";
import Table from "../components/Global/Table";
import Title from "../components/Global/Title";
import Layout from "../layout/Layout";
import { readColors } from "../redux/actions/colors";
import Pagination from "../components/Global/Pagination";
import InputSearch from "../components/Global/InputSearch";

export default function Colors() {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [type, setType] = useState();
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.color.data);

  useEffect(() => {
    return dispatch(readColors(page, type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, type]);
  return (
    <Layout>
      <div className="p-8">
        <Title name="Listado de colores" />
        <div className="flex">
          <div style={{ width: "70%" }}>
            <InputSearch
              label="Buscar por el nombre del color"
              placeholder="Escribe el nombre del color....."
              handleChange={(e) => setType(e.currentTarget.value)}
            />
          </div>
          
        </div>
        <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-8 ml-4 float-right text-xs py-1 rounded"
          >
            Agregar
          </button>
        <Modal
          title="Agregar Color"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <Form setShowModal={setShowModal} />
        </Modal>
        <Table>
          <TableContent
            setShowModal={setShowModal}
            showModal={showModal}
            colors={colors.color}
          />
        </Table>
        <Pagination method={setPage} data={colors} />
      </div>
    </Layout>
  );
}
