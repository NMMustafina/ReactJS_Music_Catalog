import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "tss-react/mui";
import {Button, Typography} from "@mui/material";
import {fetchTracks} from "../../store/actions/tracksActions";
import {createTrackHistory} from "../../store/actions/trackHistoryActions";
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";

const useStyles = makeStyles()(() => ({
    customLink: {
        '&:hover': {
            cursor: "pointer",
            textDecoration: "underline"
        }
    }
}));

const Tracks = ({match, history}) => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.tracks.fetchLoading);
    const error = useSelector(state => state.tracks.fetchError);
    const tracks = useSelector(state => state.tracks.tracks);
    const artist = useSelector(state => state.tracks.artist);
    const album = useSelector(state => state.tracks.album);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchTracks(match.params.id));
    }, [dispatch, match.params.id]);

    const onTrackHistory = async TrackHistoryData => {
        await dispatch(createTrackHistory({track: TrackHistoryData}));
    };

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
                        user ?
                            <Typography key={track._id} onClick={() => onTrackHistory(track._id)}
                                        className={classes.customLink} variant="body1" gutterBottom>
                                {track.number}. <b>{track.title}</b> <i>{track.length}</i>
                            </Typography>
                            :
                            <Typography key={track._id} variant="body1" gutterBottom>
                                {track.number}. <b>{track.title}</b> <i>{track.length}</i>
                            </Typography>
                    ))}
                    <Button onClick={history.goBack} variant="outlined" sx={{mt: 5}}>Go back</Button>
                </>
            }
        </>
    );
};

export default Tracks;