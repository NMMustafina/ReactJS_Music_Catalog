import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import {fetchTracks} from "../../store/actions/tracksActions";
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";

const Track = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.tracks.tracks);
    const loading = useSelector(state => state.tracks.loading);
    const error = useSelector(state => state.tracks.error);

    useEffect(() => {
        dispatch(fetchTracks(id));
    }, [dispatch, id]);
    console.log(tracks);
    return (
        <>
            {error ? <Error error={error}/> : null}
            {loading ? <Loader/> : null}
            {tracks &&
                <>
                    {tracks.map(track => (
                        <Typography key={track._id} variant="body1" gutterBottom>
                            {track.number}. <b>{track.title}</b> <i>{track.length}</i>
                        </Typography>
                    ))}
                </>
            }
        </>
    );
};

export default Track;