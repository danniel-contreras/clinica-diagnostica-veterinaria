import { useState, useEffect } from "react";
import Modal from "../components/Global/Modal";
import Table from "../components/Global/Table";
import Title from "../components/Global/Title";
import Form from "../components/Species/Form";
import TableContent from "../components/Species/TableContent";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { readSpecies } from "../redux/actions/species";
import Pagination from "../components/Global/Pag";
import InputSearch from "../components/Global/InputSearch";
import { readEmployeById } from "../redux/actions/employee";

export default function Species() {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const species = useSelector((state) => state.specie.data);
  const user = useSelector((state) => state.user.data);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    return dispatch(readEmployeById(auth?.user?.userid));
  }, [dispatch, auth]);
  useEffect(() => {
    return dispatch(readSpecies(page, type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, type]);
  const handleChange = (e) => {
    setType(e.currentTarget.value);
    setPage(1);
  };
  return (
    <Layout>
      <div className="p-8">
        <Title name="Listado de especies" />
        <div style={{ width: "70%" }}>
          <InputSearch
            label="Buscar por el nombre de la especie"
            placeholder="Escribe el nombre de la especie....."
            handleChange={(e) => handleChange(e)}
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-8 ml-4 float-right text-xs py-1 rounded"
        >
          Agregar
        </button>
        <Modal
          title="Agregar Especie"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <Form setShowModal={setShowModal} />
        </Modal>
        <Table>
          <TableContent user={user?.users} species={species} />
        </Table>
        <Pagination
          last={species?.totalpages}
          className="pagination-bar"
          onPageChange={setPage}
          totalCount={species?.totalItems}
          currentPage={species?.currentPage}
          pageSize={species?.take}
        />
      </div>
    </Layout>
  );
}
