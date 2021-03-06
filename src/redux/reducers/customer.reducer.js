import { types } from "../types";

const initialState = {
  data: {},
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.customerAdd:
      return {
        ...state,
        data: {...state.data, data:action.payload},
      };
    case types.customerRead:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
