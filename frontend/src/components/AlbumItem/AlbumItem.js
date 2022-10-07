import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    Badge, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Tooltip, Typography
} from "@mui/material";
import imageNotAvailable from '../../assets/image-not-available.jpg';
import {apiUrl} from "../../config";
import {AssignmentTurnedIn, Delete} from "@mui/icons-material";
import {deleteAlbum, publishAlbum} from "../../store/actions/albumsActions";

const AlbumItem = ({id, title, year, image, trackQty, isPublished}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiUrl + '/' + image;
    }

    const onPublish = async () => {
        await dispatch(publishAlbum(id));
    };

    const onDelete = async () => {
        await dispatch(deleteAlbum(id));
    };

    return (
        <>
            <Grid item md={4}>
                <Card sx={{height: '100%', maxWidth: 345}}>
                    <CardActionArea component={Link} to={'/tracks/' + id}>
                        <CardMedia
                            component="img"
                            height="345"
                            image={cardImage}
                            alt={title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h3">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Release Date:</b> {year}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Tracks Quantity:</b> {trackQty}
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

export default AlbumItem;