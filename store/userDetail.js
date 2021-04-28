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

export function mapUser(data) {
  return async (dispatch) => {
    try {
      dispatch({
        type: MAP_USER,
        payload: { data },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAP_USER:
      const data = action.payload.data.data;
      const updatedCreds = {
        firstName: data.first_name,
        lastName: data.last_name,
        companyName: data.company_name,
      };
      const updatedBalance = {
        maxAllowed: data.balance_details.max_allowed_in_paisa / 100,
        available: data.balance_details.available_balance_in_paisa / 100,
        monthlySalary: data.balance_details.monthly_salary_in_paisa / 100,
        disbursed: data.balance_details.stotal_disbursed_amount_in_paisa / 100,
      };
      const updatedStatus = {
        kycBypass: data.kyc_bypass,
        disburseAllowed: data.disbursement_allowed,
        kycComplete: data.is_kyc_completed,
        payrollSetup: data.is_payroll_setup,
      };
      const updatedCommission = {
        flat: data.flat_commission_in_paisa / 100,
        percentage: data.commission_in_percentage,
      };
      return {
        ...state,
        creds: updatedCreds,
        balance: updatedBalance,
        status: updatedStatus,
        commission: updatedCommission,
      };
    default:
      return state;
  }
};

export default userReducer;
