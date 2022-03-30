import { reducerActions as reducers } from "./reducers";

const isState = {
    setDate: null,
}

export const JobDetail = {
    name: 'JobDetail',
    state: isState,
    reducers,
    effects: (dispatch) => ({
        async nudgeJobPoster(data, state) {

        },
    }) 
}