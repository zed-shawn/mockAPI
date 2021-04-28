const initialState = {
  creds: {
    firstName: "",
    lastName: "",
    companyName: "",
  },
  balance: {
    maxAllowed: 0,
    available: 0,
    monthlySalary: 0,
    disbursed: 0,
  },
  status: {
    kycBypass: false,
    disburseAllowed: false,
    kycComplete: false,
    payrollSetup: false,
  },
  commission: {
    flat: 0,
    percentage: 0,
  },
};

const MAP_USER = "mapUser";

export function mapUser() {
  return async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAP_USER:
    default:
      return state;
  }
};

export default userReducer;
