const initialState = {
  disburseAmount: 0,
  modalVisible: false,
};

const MODAL_VISIBLE = "modalVisible";

export function modalVisible() {
  return async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_VISIBLE:
    default:
      return state;
  }
};

export default modalReducer;
