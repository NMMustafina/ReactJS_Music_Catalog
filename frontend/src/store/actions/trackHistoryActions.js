import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const FETCH_TRACK_HISTORY_REQUEST = 'FETCH_TRACK_HISTORY_REQUEST';
export const FETCH_TRACK_HISTORY_SUCCESS = 'FETCH_TRACK_HISTORY_SUCCESS';
export const FETCH_TRACK_HISTORY_FAILURE = 'FETCH_TRACK_HISTORY_FAILURE';

export const CREATE_TRACK_HISTORY_REQUEST = 'CREATE_TRACK_HISTORY_REQUEST';
export const CREATE_TRACK_HISTORY_SUCCESS = 'CREATE_TRACK_HISTORY_SUCCESS';
export const CREATE_TRACK_HISTORY_FAILURE = 'CREATE_TRACK_HISTORY_FAILURE';

const fetchTrackHistoryRequest = () => ({type: FETCH_TRACK_HISTORY_REQUEST});
const fetchTrackHistorySuccess = trackHistory => ({type: FETCH_TRACK_HISTORY_SUCCESS, payload: trackHistory});
const fetchTrackHistoryFailure = error => ({type: FETCH_TRACK_HISTORY_FAILURE, payload: error});

const createTrackHistoryRequest = () => ({type: CREATE_TRACK_HISTORY_REQUEST});
const createTrackHistorySuccess = () => ({type: CREATE_TRACK_HISTORY_SUCCESS});
const createTrackHistoryFailure = error => ({type: CREATE_TRACK_HISTORY_FAILURE, payload: error});

export const fetchTrackHistory = () => {
    return async dispatch => {
        try {
            dispatch(fetchTrackHistoryRequest());

            const response = await axiosApi('/track_history');

            dispatch(fetchTrackHistorySuccess(response.data));
        } catch (e) {
            if (e.response.status === 401) {
                toast.warn('You need login!', {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            dispatch(fetchTrackHistoryFailure(e.message));
        }
    }
};

export const createTrackHistory = (TrackHistoryData) => {
    return async dispatch => {
        try {
            dispatch(createTrackHistoryRequest());
            await axiosApi.post('/track_history', TrackHistoryData);
            toast.success('Track added to track history!', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(createTrackHistorySuccess());
        } catch (e) {
            dispatch(createTrackHistoryFailure(e.message));
            throw e;
        }
    }
};