import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Grid, LinearProgress, Typography} from "@mui/material";
import {fetchAlbums} from "../../store/actions/albumsActions";
import AlbumItem from "../../components/AlbumItem/AlbumItem";
import Error from "../../components/UI/Error/Error";

const Albums = ({match, history}) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.albums.loading);
    const error = useSelector(state => state.albums.error);
    const albums = useSelector(state => state.albums.albums);
    const artist = useSelector(state => state.albums.artist);

    useEffect(() => {
        dispatch(fetchAlbums(match.params.id));
    }, [dispatch, match.params.id]);

    return (
        <>
            {error ? <Error error={error}/> : null}
            {loading ? <Box sx={{width: '100%'}}><LinearProgress/></Box> : null}
            {albums &&
                <>
                    <Typography variant="h3" sx={{mb: 5}}>
                        Artist: {artist}
                    </Typography>
                    <Grid container rowSpacing={6} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                        {albums.map(album => (
                            <AlbumItem
                                key={album._id}
                                id={album._id}
                                title={album.title}
                                year={album.year}
                                image={album.image}
                                trackQty={album.trackQty}
                                isPublished={album.isPublished}
                                query={match.params.id}
                            />
                        ))}
                    </Grid>
                    <Button onClick={history.goBack} variant="outlined" sx={{mt: 5}}>Go back</Button>
                </>
            }
        </>
    );
};

export default Albums;