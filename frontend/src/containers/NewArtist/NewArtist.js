import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import ArtistForm from "../../components/ArtistForm/ArtistForm";
import {clearCreateArtistErrors, createArtist} from "../../store/actions/artistsActions";

const NewArtist = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.artists.createArtistError);

    useEffect(() => {
        return () => {
            dispatch(clearCreateArtistErrors());
        }
    }, [dispatch]);

    const onArtistFormSubmit = artistData => {
        dispatch(createArtist(artistData));
    };

    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                New artist
            </Typography>
            <ArtistForm
                error={error}
                onSubmit={onArtistFormSubmit}
            />
        </>
    );
};

export default NewArtist;