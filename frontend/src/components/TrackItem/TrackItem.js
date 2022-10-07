import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Badge, Grid, IconButton, Tooltip, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {createTrackHistory} from "../../store/actions/trackHistoryActions";
import {deleteTrack, publishTrack} from "../../store/actions/tracksActions";
import {AssignmentTurnedIn, Delete} from "@mui/icons-material";

const useStyles = makeStyles()(() => ({
    customLink: {
        '&:hover': {
            cursor: "pointer",
            textDecoration: "underline"
        }
    }
}));

const TrackItem = ({id, number, title, length, isPublished}) => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    const onTrackHistory = async TrackHistoryData => {
        await dispatch(createTrackHistory({track: TrackHistoryData}));
    };

    const onPublish = async () => {
        await dispatch(publishTrack(id));
    };

    const onDelete = async () => {
        await dispatch(deleteTrack(id));
    };

    return (
        <>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Typography key={id} onClick={() => onTrackHistory(id)}
                                className={classes.customLink} variant="body1" gutterBottom>
                        {number}. <b>{title}</b> <i>{length}</i>
                    </Typography>
                </Grid>
                {
                    user?.role === 'admin' &&
                    <Grid item>
                        {!isPublished &&
                            <Badge badgeContent={'Unpublished'} color="info">
                                <Tooltip title="Publish">
                                    <IconButton onClick={onPublish} color="success">
                                        <AssignmentTurnedIn/>
                                    </IconButton>
                                </Tooltip>
                            </Badge>
                        }

                        <Tooltip title="Delete">
                            <IconButton onClick={onDelete} color="error">
                                <Delete/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                }
            </Grid>

            {!user &&
                <>
                    <Typography key={id} variant="body1" gutterBottom>
                        {number}. <b>{title}</b> <i>{length}</i>
                    </Typography>
                </>
            }
        </>
    );
};

export default TrackItem;