import {
    FETCH_TRACKS_REQUEST,
    FETCH_TRACKS_SUCCESS,
    FETCH_TRACKS_FAILURE
} from "../actions/tracksActions";

const initialState = {
    artist: "",
    album: "",
    tracks: [],
    fetchLoading: false,
    fetchError: null,
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_REQUEST:
            return {...state, fetchLoading: true, fetchError: null};
        case FETCH_TRACKS_SUCCESS:
            return {
                ...state,
                artist: action.payload.artist,
                album: action.payload.album,
                tracks: action.payload.tracks,
                fetchLoading: false,
                fetchError: null
            };
        case FETCH_TRACKS_FAILURE:
            return {...state, fetchLoading: false, fetchError: action.payload};
        default:
            return state;
    }
};

export default tracksReducer;