import React, {useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Typography} from "@mui/material";
import {fetchTracks} from "../../store/actions/tracksActions";
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";

const Track = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tracks = useSelector(state => state.tracks.tracks);
    const artist = useSelector(state => state.tracks.artist);
    const album = useSelector(state => state.tracks.album);
    const loading = useSelector(state => state.tracks.loading);
    const error = useSelector(state => state.tracks.error);

    useEffect(() => {
        dispatch(fetchTracks(id));
    }, [dispatch, id]);

    return (
        <>
            {error ? <Error error={error}/> : null}
            {loading ? <Loader/> : null}
            {tracks &&
                <>
                    <Typography variant="h3" sx={{mb: 5}}>
                        Artist: {artist}
                    </Typography>
                    <Typography variant="h4" sx={{mb: 3}}>
                        Album: {album}
                    </Typography>
                    {tracks.map(track => (
                        <Typography key={track._id} variant="body1" gutterBottom>
                            {track.number}. <b>{track.title}</b> <i>{track.length}</i>
                        </Typography>
                    ))}
                    <Button onClick={() => navigate(-1)} variant="outlined" sx={{mt: 5}}>Go back</Button>
                </>
            }
        </>
    );
};

export default Track;