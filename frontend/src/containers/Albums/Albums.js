import React, {useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid, Typography} from "@mui/material";
import {fetchAlbums} from "../../store/actions/albumsActions";
import AlbumItem from "../../components/AlbumItem/AlbumItem";
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";

const Album = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const albums = useSelector(state => state.albums.albums);
    const artist = useSelector(state => state.albums.artist);
    const loading = useSelector(state => state.albums.loading);
    const error = useSelector(state => state.albums.error);

    useEffect(() => {
        dispatch(fetchAlbums(id));
    }, [dispatch, id]);

    return (
        <>
            {error ? <Error error={error}/> : null}
            {loading ? <Loader/> : null}
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
                            />
                        ))}
                    </Grid>
                    <Button onClick={() => navigate(-1)} variant="outlined" sx={{mt: 5}}>Go back</Button>
                </>
            }
        </>
    );
};

export default Album;