import React from 'react';
import {Link} from "react-router-dom";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import imageNotAvailable from '../../assets/image-not-available.png';
import {apiUrl} from "../../config";

const ArtistItem = ({id, name, info, image}) => {
    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiUrl + '/uploads/' + image;
    }

    return (
        <>
            <Grid item md={4}>
                <Card sx={{maxWidth: 345}}>
                    <CardActionArea component={Link} to={'/albums/' + id}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={cardImage}
                            alt={name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h3">
                                {name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {info}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    );
};

export default ArtistItem;