import { colorList, getAllColors } from "../../services/colors";
import { types } from "../types";

export const addColor = (data) => {
  return (dispatch) => {
    dispatch(add(data));
    dispatch(readColors());
  };
};

export function add(data) {
  return {
    type: types.colorAdd,
    payload: data,
  };
}

export const readColors = (page = 1, type = "") => {
  return (dispatch) => {
    if (type !== "") {
      page = 1;
    }
    getAllColors(page, type).then((res) => {
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
    type: types.colorRead,
    payload: data,
  };
}

export const listColor = () => {
  return (dispatch) => {
    colorList().then((res) => {
      if (res.msg) {
        dispatch(list({}));
        return;
      }
      dispatch(list(res));
    });
  };
};

export function list(data) {
  return {
    type: types.colorList,
    payload: data,
  };
}
