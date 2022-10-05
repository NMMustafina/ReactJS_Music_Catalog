import {
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALBUMS_FAILURE,
    CREATE_ALBUM_REQUEST,
    CREATE_ALBUM_SUCCESS,
    CREATE_ALBUM_FAILURE,
    CLEAR_CREATE_ALBUM_ERRORS,
    PUBLISH_ALBUM_REQUEST,
    PUBLISH_ALBUM_SUCCESS,
    PUBLISH_ALBUM_FAILURE,
    DELETE_ALBUM_REQUEST,
    DELETE_ALBUM_SUCCESS,
    DELETE_ALBUM_FAILURE
} from "../actions/albumsActions";

const initialState = {
    artist: "",
    albums: [],
    loading: false,
    error: null,
    createAlbumError: null,
    createAlbumLoading: false
};

const albumsReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_ALBUMS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_ALBUMS_SUCCESS:
            return {
                ...state,
                artist: actions.payload.artist,
                albums: actions.payload.albums,
                loading: false,
                error: null
            };
        case FETCH_ALBUMS_FAILURE:
            return {...state, loading: false, error: actions.payload};

        case CREATE_ALBUM_REQUEST:
            return {...state, createAlbumLoading: true};
        case CREATE_ALBUM_SUCCESS:
            return {...state, createAlbumLoading: false};
        case CREATE_ALBUM_FAILURE:
            return {...state, createAlbumLoading: false, createAlbumError: actions.payload};
        case CLEAR_CREATE_ALBUM_ERRORS:
            return {...state, createAlbumError: null};

        case PUBLISH_ALBUM_REQUEST:
            return {...state, loading: true};
        case PUBLISH_ALBUM_SUCCESS:
            return {...state, loading: false};
        case PUBLISH_ALBUM_FAILURE:
            return {...state, loading: false, error: actions.payload};

        case DELETE_ALBUM_REQUEST:
            return {...state, loading: true};
        case DELETE_ALBUM_SUCCESS:
            return {...state, loading: false};
        case DELETE_ALBUM_FAILURE:
            return {...state, loading: false, error: actions.payload};
        default:
            return state;
    }
};

export default albumsReducer;