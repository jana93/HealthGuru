import {combineReducers} from 'redux';

import {
    LOGIN_USER,
    SIGNUP_USER,
    GET_MEDICINE_LIST,
    GET_MEDICINE_DETAILS,
    ADD_MEDICINE,
    UPDATE_MEDICINE,
    DELETE_MEDICINE,
} from '../actions/';

let initialStateLogin = {
    userId:null,
    email:null,
};

let initialStateMedicine = {
    medicineList: [],
    loading: true,
};

const loginReducer = (state = initialStateLogin, action) => {
    switch (action.type) {
        case SIGNUP_USER:
            state = Object.assign({}, state, {
                userId: action.user.uid,
                email:action.user.email,
            });
            return state;
        default:
            return state;
    }
};


export const medicineReducer = (state = initialStateMedicine, action) => {
    switch (action.type) {

        case GET_MEDICINE_LIST:
          state = Object.assign({}, state, {medicineList: action.medicineList, loading: !state.loading});
          console.log(state);
          return state;

        case ADD_MEDICINE:
            state = {medicineList: [...state.medicineList, action.medicineDetails], loading: !state.loading};
            return state;

        case DELETE_MEDICINE:
            console.log(action.deleteIndex)
            state = {
                medicineList: state.medicineList.filter((item, index) => index !== action.deleteIndex),
                loading: !state.loading,
            };
            return state;

        case UPDATE_MEDICINE:

            let finalState = JSON.parse(JSON.stringify(state));
            console.log(action.medicineDetails);
            console.log(action.index);
            Object.assign(finalState.medicineList[action.index], action.medicineDetails);
            finalState.loading = !state.loading;
            return finalState;

        default:
            return state;

    }
};



const rootReducer = combineReducers({
    loginReducer: loginReducer,
    medicineReducer:medicineReducer,
});

export default rootReducer;
