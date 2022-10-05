import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import {clearCreateTrackErrors, createTrack} from "../../store/actions/tracksActions";
import TrackForm from "../../components/TrackForm/TrackForm";
import {fetchArtists} from "../../store/actions/artistsActions";

const NewTrack = ({history}) => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artists.artists);
    const error = useSelector(state => state.tracks.createTrackError);

    useEffect(() => {
        return () => {
            dispatch(clearCreateTrackErrors());
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const onTrackFormSubmit = async trackData => {
        await dispatch(createTrack(trackData));
        history.push("/");
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