import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import {clearCreateAlbumErrors, createAlbum} from "../../store/actions/albumsActions";
import AlbumForm from "../../components/AlbumForm/AlbumForm";
import {fetchArtists} from "../../store/actions/artistsActions";

const NewAlbum = ({history}) => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artists.artists);
    const error = useSelector(state => state.albums.createAlbumError);

    useEffect(() => {
        return () => {
            dispatch(clearCreateAlbumErrors());
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const onAlbumFormSubmit = async albumData => {
        await dispatch(createAlbum(albumData));
        history.push("/");
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