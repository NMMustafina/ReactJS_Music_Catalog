import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import useToast from "../../hooks/useToast";

export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

export const CREATE_ARTIST_REQUEST = 'CREATE_ARTIST_REQUEST';
export const CREATE_ARTIST_SUCCESS = 'CREATE_ARTIST_SUCCESS';
export const CREATE_ARTIST_FAILURE = 'CREATE_ARTIST_FAILURE';
export const CLEAR_CREATE_ARTIST_ERRORS = 'CLEAR_CREATE_ARTIST_ERRORS';

export const PUBLISH_ARTIST_REQUEST = 'PUBLISH_ARTIST_REQUEST';
export const PUBLISH_ARTIST_SUCCESS = 'PUBLISH_ARTIST_SUCCESS';
export const PUBLISH_ARTIST_FAILURE = 'PUBLISH_ARTIST_FAILURE';

export const DELETE_ARTIST_REQUEST = 'DELETE_ARTIST_REQUEST';
export const DELETE_ARTIST_SUCCESS = 'DELETE_ARTIST_SUCCESS';
export const DELETE_ARTIST_FAILURE = 'DELETE_ARTIST_FAILURE';

const fetchArtistsRequest = () => ({type: FETCH_ARTISTS_REQUEST});
const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, payload: artists});
const fetchArtistsFailure = error => ({type: FETCH_ARTISTS_FAILURE, payload: error});

const createArtistRequest = () => ({type: CREATE_ARTIST_REQUEST});
const createArtistSuccess = () => ({type: CREATE_ARTIST_SUCCESS});
const createArtistFailure = error => ({type: CREATE_ARTIST_FAILURE, payload: error});
export const clearCreateArtistErrors = () => ({type: CLEAR_CREATE_ARTIST_ERRORS});

const publishArtistRequest = () => ({type: PUBLISH_ARTIST_REQUEST});
const publishArtistSuccess = () => ({type: PUBLISH_ARTIST_SUCCESS});
const publishArtistFailure = error => ({type: PUBLISH_ARTIST_FAILURE, payload: error});

const deleteArtistRequest = () => ({type: DELETE_ARTIST_REQUEST});
const deleteArtistSuccess = () => ({type: DELETE_ARTIST_SUCCESS});
const deleteArtistFailure = error => ({type: DELETE_ARTIST_FAILURE, payload: error});

export const fetchArtists = () => {
    return async dispatch => {
        try {
            dispatch(fetchArtistsRequest());

            const response = await axiosApi('/artists');

            if (response.data) {
                dispatch(fetchArtistsSuccess(response.data));
            } else {
                dispatch(fetchArtistsSuccess([]));
            }
        } catch (error) {
            dispatch(fetchArtistsFailure(error.message));
            throw error;
        }
    };
};

export const createArtist = (artistData) => {
    return async dispatch => {
        try {
            dispatch(createArtistRequest());
            await axiosApi.post('/artists', artistData);
            dispatch(createArtistSuccess());
            dispatch(historyPush('/'));
            useToast('success', 'Artist added successfully!');
        } catch (e) {
            dispatch(createArtistFailure(e.response.data));
        }
    }
};

export const publishArtist = id => {
    return async dispatch => {
        try {
            dispatch(publishArtistRequest());
            await axiosApi.post(`/artists/${id}/publish`);
            dispatch(publishArtistSuccess());
        } catch (error) {
            dispatch(publishArtistFailure(error.message));
            throw error;
        }
    };
};

export const deleteArtist = id => {
    return async dispatch => {
        try {
            dispatch(deleteArtistRequest());
            await axiosApi.delete(`/artists/${id}`);
            dispatch(deleteArtistSuccess());
        } catch (error) {
            dispatch(deleteArtistFailure(error.message));
            throw error;
        }
    };
};