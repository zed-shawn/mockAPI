const initialState = {
  disburseAmount: 0,
  modalVisible: false,
  resetTime: 0,
};

const MODAL_VISIBLE = "modalVisible";
const DISPLAY_BILL = "displayBill";
const RESET_AMOUNT = "resetAmount";

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
export function resetAmount() {
  return async (dispatch) => {
    try {
      dispatch({
        type: RESET_AMOUNT,
        payload: {},
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
    case RESET_AMOUNT:
      return {
        ...state,
        resetTime: new Date(),
      };
    default:
      return state;
  }
};

export default modalReducer;
