import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Typography} from "@mui/material";
import {fetchTracks} from "../../store/actions/tracksActions";
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";
import TrackItem from "../../components/TrackItem/TrackItem";

const Tracks = ({match, history}) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.tracks.loading);
    const error = useSelector(state => state.tracks.error);
    const tracks = useSelector(state => state.tracks.tracks);
    const artist = useSelector(state => state.tracks.artist);
    const album = useSelector(state => state.tracks.album);

    useEffect(() => {
        dispatch(fetchTracks(match.params.id));
    }, [dispatch, match.params.id]);

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
                        <TrackItem
                            key={track._id}
                            id={track._id}
                            number={track.number}
                            title={track.title}
                            length={track.length}
                            isPublished={track.isPublished}
                        />
                    ))}
                    <Button onClick={history.goBack} variant="outlined" sx={{mt: 5}}>Go back</Button>
                </>
            }
        </>
    );
};

export default Tracks;