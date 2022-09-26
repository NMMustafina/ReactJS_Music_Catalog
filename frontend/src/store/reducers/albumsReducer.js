import {
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALBUMS_FAILURE
} from "../actions/albumsActions";

const initialState = {
    artist: "",
    albums: [],
    fetchLoading: false,
    fetchError: null,
};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALBUMS_REQUEST:
            return {...state, fetchLoading: true, fetchError: null};
        case FETCH_ALBUMS_SUCCESS:
            return {
                ...state,
                artist: action.payload.artist,
                albums: action.payload.albums,
                fetchLoading: false,
                fetchError: null
            };
        case FETCH_ALBUMS_FAILURE:
            return {...state, fetchLoading: false, fetchError: action.payload};
        default:
            return state;
    }
};

export default albumsReducer;