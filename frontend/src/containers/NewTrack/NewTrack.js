import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import {clearCreateTrackErrors, createTrack} from "../../store/actions/tracksActions";
import {fetchArtists} from "../../store/actions/artistsActions";
import TrackForm from "../../components/TrackForm/TrackForm";

const NewTrack = () => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artists.artists);
    const error = useSelector(state => state.tracks.createTrackError);

    useEffect(() => {
        dispatch(fetchArtists());

        return () => {
            dispatch(clearCreateTrackErrors());
        }
    }, [dispatch]);

    const onTrackFormSubmit = trackData => {
        dispatch(createTrack(trackData));
    };

    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                New track
            </Typography>
            <TrackForm
                artists={artists}
                error={error}
                onSubmit={onTrackFormSubmit}
            />
        </>
    );
};

export default NewTrack;