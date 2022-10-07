import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    Badge,
    Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Tooltip, Typography
} from "@mui/material";
import {Delete, AssignmentTurnedIn} from "@mui/icons-material";
import imageNotAvailable from '../../assets/image-not-available.jpg';
import {apiUrl} from "../../config";
import {deleteArtist, fetchArtists, publishArtist} from "../../store/actions/artistsActions";

const ArtistItem = ({id, title, info, image, isPublished}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiUrl + '/' + image;
    }

    const onPublish = async () => {
        await dispatch(publishArtist(id));
        await dispatch(fetchArtists());
    };

    const onDelete = async () => {
        await dispatch(deleteArtist(id));
        await dispatch(fetchArtists());
    };

    return (
        <>
            <Grid item md={4}>
                <Card sx={{height: '100%', maxWidth: 345}} elevation={2}>
                    <CardActionArea component={Link} to={'/albums/' + id}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={cardImage}
                            alt={title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h3">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {info}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    {
                        user?.role === 'admin' &&
                        <CardActions disableSpacing>

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
                        </CardActions>
                    }
                </Card>
            </Grid>
        </>
    );
};

export default ArtistItem;