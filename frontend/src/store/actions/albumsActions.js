import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import history from "../../history";
import {toast} from "react-toastify";

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const CREATE_ALBUM_REQUEST = 'CREATE_ALBUM_REQUEST';
export const CREATE_ALBUM_SUCCESS = 'CREATE_ALBUM_SUCCESS';
export const CREATE_ALBUM_FAILURE = 'CREATE_ALBUM_FAILURE';
export const CLEAR_CREATE_ALBUM_ERRORS = 'CLEAR_CREATE_ALBUM_ERRORS';

export const PUBLISH_ALBUM_REQUEST = 'PUBLISH_ALBUM_REQUEST';
export const PUBLISH_ALBUM_SUCCESS = 'PUBLISH_ALBUM_SUCCESS';
export const PUBLISH_ALBUM_FAILURE = 'PUBLISH_ALBUM_FAILURE';

export const DELETE_ALBUM_REQUEST = 'DELETE_ALBUM_REQUEST';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';
export const DELETE_ALBUM_FAILURE = 'DELETE_ALBUM_FAILURE';

const fetchAlbumsRequest = () => ({type: FETCH_ALBUMS_REQUEST});
const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, payload: albums});
const fetchAlbumsFailure = error => ({type: FETCH_ALBUMS_FAILURE, payload: error});

const createAlbumRequest = () => ({type: CREATE_ALBUM_REQUEST});
const createAlbumSuccess = () => ({type: CREATE_ALBUM_SUCCESS});
const createAlbumFailure = error => ({type: CREATE_ALBUM_FAILURE, payload: error});
export const clearCreateAlbumErrors = () => ({type: CLEAR_CREATE_ALBUM_ERRORS});

const publishAlbumRequest = () => ({type: PUBLISH_ALBUM_REQUEST});
const publishAlbumSuccess = () => ({type: PUBLISH_ALBUM_SUCCESS});
const publishAlbumFailure = error => ({type: PUBLISH_ALBUM_FAILURE, payload: error});

const deleteAlbumRequest = () => ({type: DELETE_ALBUM_REQUEST});
const deleteAlbumSuccess = () => ({type: DELETE_ALBUM_SUCCESS});
const deleteAlbumFailure = error => ({type: DELETE_ALBUM_FAILURE, payload: error});

export const fetchAlbums = (id) => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumsRequest());

            const response = await axiosApi('/albums?artist=' + id);

            if (response.data) {
                dispatch(fetchAlbumsSuccess(response.data));
            } else {
                dispatch(fetchAlbumsSuccess([]));
            }
        } catch (error) {
            dispatch(fetchAlbumsFailure(error.message));
            throw error;
        }
    };
};

export const createAlbum = (albumData, artist) => {
    return async dispatch => {
        try {
            dispatch(createAlbumRequest());
            await axiosApi.post('/albums', albumData);
            dispatch(createAlbumSuccess());
            dispatch(historyPush('/albums/' + artist));
            toast.success('Album added successfully!', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            dispatch(createAlbumFailure(e.response.data));
        }
    }
};

export const publishAlbum = id => {
    return async dispatch => {
        try {
            dispatch(publishAlbumRequest());
            await axiosApi.post(`/albums/${id}/publish`);
            dispatch(publishAlbumSuccess());
            history.go(0);
        } catch (error) {
            dispatch(publishAlbumFailure(error.message));
            throw error;
        }
    };
};

export const deleteAlbum = id => {
    return async dispatch => {
        try {
            dispatch(deleteAlbumRequest());
            await axiosApi.delete(`/albums/${id}`);
            dispatch(deleteAlbumSuccess());
            history.go(0);
        } catch (error) {
            dispatch(deleteAlbumFailure(error.message));
            throw error;
        }
    };
};