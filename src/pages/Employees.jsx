import { useState, useEffect } from "react";
import TableContent from "../components/Employee/TableContent";
import Modal from "../components/Global/Modal";
import Table from "../components/Global/Table";
import Title from "../components/Global/Title";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { readRoles } from "../redux/actions/role";
import { readShifts } from "../redux/actions/shifts";
import { readEmployees } from "../redux/actions/employee";
import Pagination from "../components/Global/Pag";
import AddForm from "../components/Employee/AddForm";

export default function Employees() {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role.data);
  const shifts = useSelector((state) => state.shift.data);
  const employees = useSelector((state) => state.employee.data);
  useEffect(() => {
    dispatch(readRoles());
    dispatch(readShifts());
    dispatch(readEmployees(page));
  }, [dispatch, page]);
  return (
    <Layout>
      <div className="p-8 flex flex-col">
        <Title name="Listado de empleados" />
        <div className="w-full">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-8 ml-4 float-right text-xs py-1 rounded"
          >
            Agregar
          </button>
        </div>

        <Table>
          <TableContent roles={roles} shifts={shifts} employees={employees} />
        </Table>

        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          title="Agregar empleado"
        >
          <AddForm setShowModal={setShowModal} roles={roles} shifts={shifts} />
        </Modal>
        <Pagination
          last={employees?.totalpages}
          className="pagination-bar"
          onPageChange={setPage}
          totalCount={employees?.totalItems}
          currentPage={employees?.currentPage}
          pageSize={employees?.take}
        />
      </div>
    </Layout>
  );
}
