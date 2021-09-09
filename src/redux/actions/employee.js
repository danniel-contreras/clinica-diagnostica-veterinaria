import { getAllEmployees, getEmployeById } from "../../services/employee";
import { types } from "../types";

export const addEmployee = (data) => {
  return (dispatch) => {
    dispatch(add(data));
    dispatch(readEmployees(1));
  };
};

export function add(data) {
  return {
    type: types.employeeAdd,
    payload: data,
  };
}

export const readEmployees = (page) => {
  return (dispatch) => {
    getAllEmployees(page).then((res) => {
      if (res.msg) {
        dispatch(read({}));
        return;
      }
      dispatch(read(res));
    });
  };
};

export function read(data) {
  return {
    type: types.employeeRead,
    payload: data,
  };
}
export const readEmployeById = (id) => {
  return (dispatch) => {
    getEmployeById(id).then((res) => {
      if (res.msg) {
        dispatch(read({}));
        return;
      }
      dispatch(readById(res));
    });
  };
};
export function readById(data) {
  return {
    type: types.userReadById,
    payload: data,
  };
}
