const initialState = {
  disburseAmount: 0,
  modalVisible: false,
};

const MODAL_VISIBLE = "modalVisible";
const DISPLAY_BILL = "displayBill";

export function modalVisible(state) {
  return async (dispatch) => {
    try {
      dispatch({
        type: MODAL_VISIBLE,
        payload: { state },
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function displayBill(amount) {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_BILL,
        payload: { amount },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: action.payload.state,
      };
    case DISPLAY_BILL:
      return {
        ...state,
        disburseAmount: action.payload.amount,
        modalVisible: true,
      };
    default:
      return state;
  }
};

export default modalReducer;
