import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const CREATE_TRACK_REQUEST = 'CREATE_TRACK_REQUEST';
export const CREATE_TRACK_SUCCESS = 'CREATE_TRACK_SUCCESS';
export const CREATE_TRACK_FAILURE = 'CREATE_TRACK_FAILURE';
export const CLEAR_CREATE_TRACK_ERRORS = 'CLEAR_CREATE_TRACK_ERRORS';

export const PUBLISH_TRACK_REQUEST = 'PUBLISH_TRACK_REQUEST';
export const PUBLISH_TRACK_SUCCESS = 'PUBLISH_TRACK_SUCCESS';
export const PUBLISH_TRACK_FAILURE = 'PUBLISH_TRACK_FAILURE';

export const DELETE_TRACK_REQUEST = 'DELETE_TRACK_REQUEST';
export const DELETE_TRACK_SUCCESS = 'DELETE_TRACK_SUCCESS';
export const DELETE_TRACK_FAILURE = 'DELETE_TRACK_FAILURE';

const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, payload: tracks});
const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, payload: error});

const createTrackRequest = () => ({type: CREATE_TRACK_REQUEST});
const createTrackSuccess = () => ({type: CREATE_TRACK_SUCCESS});
const createTrackFailure = error => ({type: CREATE_TRACK_FAILURE, payload: error});
export const clearCreateTrackErrors = () => ({type: CLEAR_CREATE_TRACK_ERRORS});

const publishTrackRequest = () => ({type: PUBLISH_TRACK_REQUEST});
const publishTrackSuccess = () => ({type: PUBLISH_TRACK_SUCCESS});
const publishTrackFailure = error => ({type: PUBLISH_TRACK_FAILURE, payload: error});

const deleteTrackRequest = () => ({type: DELETE_TRACK_REQUEST});
const deleteTrackSuccess = () => ({type: DELETE_TRACK_SUCCESS});
const deleteTrackFailure = error => ({type: DELETE_TRACK_FAILURE, payload: error});

export const fetchTracks = (id) => {
    return async dispatch => {
        try {
            dispatch(fetchTracksRequest());

            const response = await axiosApi('/tracks?album=' + id);

            if (response.data) {
                dispatch(fetchTracksSuccess(response.data));
            } else {
                dispatch(fetchTracksSuccess([]));
            }

        } catch (error) {
            dispatch(fetchTracksFailure(error.message));
            throw error;
        }
    };
};

export const createTrack = (trackData) => {
    return async dispatch => {
        try {
            dispatch(createTrackRequest());
            await axiosApi.post('/tracks', trackData);
            dispatch(createTrackSuccess());
            dispatch(historyPush('/'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createTrackFailure(e.response.data));
            } else {
                dispatch(createTrackFailure({global: 'No internet'}));
            }
            throw e;
        }
    }
};

export const publishTrack = id => {
    return async dispatch => {
        try {
            dispatch(publishTrackRequest());
            await axiosApi.post(`/tracks/${id}/publish`);
            dispatch(publishTrackSuccess());
            dispatch(historyPush('/'));
        } catch (error) {
            dispatch(publishTrackFailure(error.message));
            throw error;
        }
    };
};

export const deleteTrack = id => {
    return async dispatch => {
        try {
            dispatch(deleteTrackRequest());
            await axiosApi.delete(`/tracks/${id}`);
            dispatch(deleteTrackSuccess());
            dispatch(historyPush('/'));
        } catch (error) {
            dispatch(deleteTrackFailure(error.message));
            throw error;
        }
    };
};