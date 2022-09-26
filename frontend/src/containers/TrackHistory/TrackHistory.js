import React, {useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Paper, Typography} from "@mui/material";
import {fetchTrackHistory} from "../../store/actions/trackHistoryActions";
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";

const TrackHistory = ({history}) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.trackHistory.fetchLoading);
    const error = useSelector(state => state.trackHistory.fetchError);
    const trackHistory = useSelector(state => state.trackHistory.trackHistory);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchTrackHistory());
    }, [dispatch]);

    if (!user) {
        return <Redirect to="/login"/>;
    }

    const dateFormatter = (date) => {
        if (!date) {
            return;
        }
        date = date.replace('T', ' ');
        date = date.slice(0, date.length - 5);
        return date;
    }

    return (
        <>
            {error ? <Error error={error}/> : null}
            {loading ? <Loader/> : null}
            {trackHistory &&
                <>
                    <Typography variant="h3" sx={{mb: 5}}>
                        Track History
                    </Typography>
                    {trackHistory.map(track => (
                        <Paper key={track._id} elevation={2} sx={{mb: 3, p: 2}}>
                            <Typography variant="body1" gutterBottom>
                                <b>Artist:</b> {track.artist}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <b>Track:</b> {track.track}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <b>Time:</b> {dateFormatter(track.datetime)}
                            </Typography>
                        </Paper>
                    ))}
                    <Button onClick={history.goBack} variant="outlined" sx={{mt: 5}}>Go back</Button>
                </>
            }
        </>
    );
};

export default TrackHistory;