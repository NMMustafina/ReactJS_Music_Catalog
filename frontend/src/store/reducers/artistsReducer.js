import {
    FETCH_ARTISTS_REQUEST,
    FETCH_ARTISTS_SUCCESS,
    FETCH_ARTISTS_FAILURE,
    CREATE_ARTIST_REQUEST,
    CREATE_ARTIST_SUCCESS,
    CREATE_ARTIST_FAILURE,
    CLEAR_CREATE_ARTIST_ERRORS,
    PUBLISH_ARTIST_REQUEST,
    PUBLISH_ARTIST_SUCCESS,
    PUBLISH_ARTIST_FAILURE,
    DELETE_ARTIST_REQUEST,
    DELETE_ARTIST_SUCCESS,
    DELETE_ARTIST_FAILURE
} from "../actions/artistsActions";

const initialState = {
    artists: [],
    loading: false,
    error: null,
    createArtistError: null,
    createArtistLoading: false
};

const artistsReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_ARTISTS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_ARTISTS_SUCCESS:
            return {...state, loading: false, artists: actions.payload};
        case FETCH_ARTISTS_FAILURE:
            return {...state, loading: false, error: actions.payload};

        case CREATE_ARTIST_REQUEST:
            return {...state, createArtistLoading: true};
        case CREATE_ARTIST_SUCCESS:
            return {...state, createArtistLoading: false};
        case CREATE_ARTIST_FAILURE:
            return {...state, createArtistLoading: false, createArtistError: actions.payload};
        case CLEAR_CREATE_ARTIST_ERRORS:
            return {...state, createArtistError: null};

        case PUBLISH_ARTIST_REQUEST:
            return {...state, loading: true};
        case PUBLISH_ARTIST_SUCCESS:
            return {...state, loading: false};
        case PUBLISH_ARTIST_FAILURE:
            return {...state, loading: false, error: actions.payload};

        case DELETE_ARTIST_REQUEST:
            return {...state, loading: true};
        case DELETE_ARTIST_SUCCESS:
            return {...state, loading: false};
        case DELETE_ARTIST_FAILURE:
            return {...state, loading: false, error: actions.payload};

        default:
            return state;
    }
};

export default artistsReducer;