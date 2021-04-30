const initialState = {
  disburseAmount: 0,
  billModalVisible: false,
  withdrawModalVisible: false,
  resetTime: 0,
};

const BILL_MODAL_VISIBLE = "billModalVisible";
const WITHDRAW_MODAL_VISIBLE = "withdrawModalVisible";
const DISPLAY_BILL = "displayBill";
const RESET_AMOUNT = "resetAmount";

export function withdrawModalVisible(state) {
  return async (dispatch) => {
    try {
      dispatch({
        type: WITHDRAW_MODAL_VISIBLE,
        payload: { state },
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function billModalVisible(state) {
  return async (dispatch) => {
    try {
      dispatch({
        type: BILL_MODAL_VISIBLE,
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
    case WITHDRAW_MODAL_VISIBLE:
      return {
        ...state,
        withdrawModalVisible: action.payload.state,
      };
    case BILL_MODAL_VISIBLE:
      return {
        ...state,
        billModalVisible: action.payload.state,
      };
    case DISPLAY_BILL:
      return {
        ...state,
        disburseAmount: action.payload.amount,
        billModalVisible: true,
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
