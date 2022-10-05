import {
    FETCH_TRACK_HISTORY_FAILURE,
    FETCH_TRACK_HISTORY_REQUEST,
    FETCH_TRACK_HISTORY_SUCCESS,
    CREATE_TRACK_HISTORY_REQUEST,
    CREATE_TRACK_HISTORY_SUCCESS
} from "../actions/trackHistoryActions";

const initialState = {
    trackHistory: [],
    loading: false,
    error: null,
};

const trackHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACK_HISTORY_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_TRACK_HISTORY_SUCCESS:
            return {...state, loading: false, trackHistory: action.payload};
        case FETCH_TRACK_HISTORY_FAILURE:
            return {...state, loading: false, error: action.payload};

        case CREATE_TRACK_HISTORY_REQUEST:
            return {...state, loading: true};
        case CREATE_TRACK_HISTORY_SUCCESS:
            return {...state, loading: false};
        default:
            return state;
    }
};

export default trackHistoryReducer;