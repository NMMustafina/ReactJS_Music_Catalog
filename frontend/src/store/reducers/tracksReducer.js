import {
    FETCH_TRACKS_REQUEST,
    FETCH_TRACKS_SUCCESS,
    FETCH_TRACKS_FAILURE,
    CREATE_TRACK_REQUEST,
    CREATE_TRACK_SUCCESS,
    CREATE_TRACK_FAILURE,
    CLEAR_CREATE_TRACK_ERRORS,
    PUBLISH_TRACK_REQUEST,
    PUBLISH_TRACK_SUCCESS,
    PUBLISH_TRACK_FAILURE,
    DELETE_TRACK_REQUEST,
    DELETE_TRACK_SUCCESS,
    DELETE_TRACK_FAILURE
} from "../actions/tracksActions";

const initialState = {
    artist: "",
    album: "",
    tracks: [],
    loading: false,
    error: null,
};

const tracksReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_TRACKS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_TRACKS_SUCCESS:
            return {
                ...state,
                artist: actions.payload.artist,
                album: actions.payload.album,
                tracks: actions.payload.tracks,
                loading: false,
                error: null
            };
        case FETCH_TRACKS_FAILURE:
            return {...state, loading: false, error: actions.payload};

        case CREATE_TRACK_REQUEST:
            return {...state, createTrackLoading: true};
        case CREATE_TRACK_SUCCESS:
            return {...state, createTrackLoading: false};
        case CREATE_TRACK_FAILURE:
            return {...state, createTrackLoading: false, createTrackError: actions.payload};
        case CLEAR_CREATE_TRACK_ERRORS:
            return {...state, createTrackError: null};

        case PUBLISH_TRACK_REQUEST:
            return {...state, loading: true};
        case PUBLISH_TRACK_SUCCESS:
            return {...state, loading: false};
        case PUBLISH_TRACK_FAILURE:
            return {...state, loading: false, error: actions.payload};

        case DELETE_TRACK_REQUEST:
            return {...state, loading: true};
        case DELETE_TRACK_SUCCESS:
            return {...state, loading: false};
        case DELETE_TRACK_FAILURE:
            return {...state, loading: false, error: actions.payload};
        default:
            return state;
    }
};

export default tracksReducer;