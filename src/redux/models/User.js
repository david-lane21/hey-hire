import { reducerActions as reducers } from "./reducers";

const initialState = {
    profile: {},
    token: null
}

export const UserData = {
    name: 'UserData',
    state: initialState,
    reducers,
    
}