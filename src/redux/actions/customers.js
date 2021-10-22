import { searchCustomer } from "../../services/customers";
import { types } from "../types";

export const addCustomer = (data) => {
  return (dispatch) => {
    dispatch(add(data));
    dispatch(readCustomers("","",1));
  };
};

export function add(data) {
  return {
    type: types.customerAdd,
    payload: data,
  };
}

export const readCustomers = (name = "", last = "", page = 1,limit=25,state=1) => {
  return (dispatch) => {
    if (name !== "" || last !== "") {
      page = 1;
    }
    searchCustomer(name, last, page,limit,state).then((res) => {
      if (!res.ok) {
        dispatch(read({}));
        return;
      }
      dispatch(read(res));
    });
  };
};
export function read(data) {
  return {
    type: types.customerRead,
    payload: data,
  };
}
