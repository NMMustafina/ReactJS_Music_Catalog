import {
    FETCH_TRACKS_REQUEST,
    FETCH_TRACKS_SUCCESS,
    FETCH_TRACKS_FAILURE
} from "../actions/tracksActions";

const initialState = {
    tracks: [],
    loading: false,
    error: null,
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_TRACKS_SUCCESS:
            return {...state, loading: false, error: null, tracks: action.payload};
        case FETCH_TRACKS_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default tracksReducer;