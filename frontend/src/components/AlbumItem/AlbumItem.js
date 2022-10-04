import React from 'react';
import {Link} from "react-router-dom";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import imageNotAvailable from '../../assets/image-not-available.jpg';
import {apiUrl} from "../../config";

const ArtistItem = ({id, title, year, image, trackQty}) => {
    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiUrl + '/' + image;
    }

    return (
        <>
            <Grid item md={4}>
                <Card sx={{height: '100%', maxWidth: 345}}>
                    <CardActionArea component={Link} to={'/tracks/' + id} sx={{height: '100%'}}>
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
                </Card>
            </Grid>
        </>
    );
};

export default ArtistItem;