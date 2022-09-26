import {
    FETCH_ARTISTS_REQUEST,
    FETCH_ARTISTS_SUCCESS,
    FETCH_ARTISTS_FAILURE
} from "../actions/artistsActions";

const initialState = {
    artists: [],
    fetchLoading: false,
    fetchError: null,
};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTISTS_REQUEST:
            return {...state, fetchLoading: true, fetchError: null};
        case FETCH_ARTISTS_SUCCESS:
            return {...state, fetchLoading: false, artists: action.payload};
        case FETCH_ARTISTS_FAILURE:
            return {...state, fetchLoading: false, fetchError: action.payload};
        default:
            return state;
    }
};

export default artistsReducer;