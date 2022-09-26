import {
    FETCH_TRACKS_REQUEST,
    FETCH_TRACKS_SUCCESS,
    FETCH_TRACKS_FAILURE
} from "../actions/tracksActions";

const initialState = {
    artist: "",
    album: "",
    tracks: [],
    loading: false,
    error: null,
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_TRACKS_SUCCESS:
            return {
                ...state,
                artist: action.payload.artist,
                album: action.payload.album,
                tracks: action.payload.tracks,
                loading: false,
                error: null
            };
        case FETCH_TRACKS_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default tracksReducer;