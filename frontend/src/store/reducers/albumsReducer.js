import {
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALBUMS_FAILURE
} from "../actions/albumsActions";

const initialState = {
    albums: [],
    loading: false,
    error: null,
};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALBUMS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_ALBUMS_SUCCESS:
            return {...state, loading: false, error: null, albums: action.payload};
        case FETCH_ALBUMS_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default albumsReducer;