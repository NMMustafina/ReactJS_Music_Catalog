import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import {clearCreateAlbumErrors, createAlbum} from "../../store/actions/albumsActions";
import AlbumForm from "../../components/AlbumForm/AlbumForm";
import {fetchArtists} from "../../store/actions/artistsActions";

const NewAlbum = () => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artists.artists);
    const error = useSelector(state => state.albums.createAlbumError);

    useEffect(() => {
        dispatch(fetchArtists());

        return () => {
            dispatch(clearCreateAlbumErrors());
        }
    }, [dispatch]);

    const onAlbumFormSubmit = (albumData, artist) => {
        dispatch(createAlbum(albumData, artist));
    };

    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                New album
            </Typography>
            <AlbumForm
                artists={artists}
                error={error}
                onSubmit={onAlbumFormSubmit}
            />
        </>
    );
};

export default NewAlbum;