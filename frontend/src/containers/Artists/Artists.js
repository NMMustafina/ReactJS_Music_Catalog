import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";
import {fetchArtists} from "../../store/actions/artistsActions";
import ArtistItem from "../../components/ArtistItem/ArtistItem";
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";

const Artists = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.artists.loading);
    const error = useSelector(state => state.artists.error);
    const artists = useSelector(state => state.artists.artists);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <>
            {error ? <Error error={error}/> : null}
            {loading ? <Loader/> : null}
            {artists &&
                <>
                    <Typography component="h2" variant="h2" align="center" sx={{mb: 5}}>
                        Artists
                    </Typography>
                    <Grid container rowSpacing={6} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                        {artists.map(artist => (
                            <ArtistItem
                                key={artist._id}
                                id={artist._id}
                                name={artist.name}
                                info={artist.info}
                                image={artist.image}
                                isPublished={artist.isPublished}
                            />
                        ))}
                    </Grid>
                </>
            }
        </>
    );
};

export default Artists;