import {
    FETCH_TRACK_HISTORY_FAILURE,
    FETCH_TRACK_HISTORY_REQUEST,
    FETCH_TRACK_HISTORY_SUCCESS,
    CREATE_TRACK_HISTORY_REQUEST,
    CREATE_TRACK_HISTORY_SUCCESS
} from "../actions/trackHistoryActions";

const initialState = {
    trackHistory: [],
    fetchLoading: false,
    fetchError: null,
};

const trackHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACK_HISTORY_REQUEST:
            return {...state, fetchLoading: true, fetchError: null};
        case FETCH_TRACK_HISTORY_SUCCESS:
            return {...state, fetchLoading: false, trackHistory: action.payload};
        case FETCH_TRACK_HISTORY_FAILURE:
            return {...state, fetchLoading: false, fetchError: action.payload};

        case CREATE_TRACK_HISTORY_REQUEST:
            return {...state, fetchLoading: true};
        case CREATE_TRACK_HISTORY_SUCCESS:
            return {...state, fetchLoading: false};
        default:
            return state;
    }
};

export default trackHistoryReducer;