import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";
import {fetchAlbums} from "../../store/actions/albumsActions";
import AlbumItem from "../../components/AlbumItem/AlbumItem";
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";

const Album = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums.albums);
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
                    <Typography component="h2" variant="h2" align="center" sx={{mb: 5}}>
                        Albums
                    </Typography>
                    <Grid container rowSpacing={6} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                        {albums.map(album => (
                            <AlbumItem
                                key={album._id}
                                id={album._id}
                                title={album.title}
                                year={album.year}
                                image={album.image}
                            />
                        ))}
                    </Grid>
                </>
            }
        </>
    );
};

export default Album;