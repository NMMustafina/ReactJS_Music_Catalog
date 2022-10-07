import React, {useEffect, useState} from 'react';
import {Button, Grid} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";
import {fetchAlbums} from "../../store/actions/albumsActions";
import {useDispatch} from "react-redux";

const TrackForm = ({onSubmit, artists, albums, error}) => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        number: "",
        title: "",
        album: "",
        length: "",
        artist: ""
    });

    useEffect(() => {
        if (state.artist) {
            dispatch(fetchAlbums(state.artist));
        }
    }, [dispatch, state.artist]);

    const submitFormHandler = e => {
        e.preventDefault();
        const trackData = {};
        trackData.number = state.number;
        trackData.title = state.title;
        trackData.album = state.album;
        trackData.length = state.length;
        onSubmit(trackData);
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid
                container
                maxWidth="md"
                textAlign="center"
                marginX="auto"
                direction="column"
                rowSpacing={2}
            >
                <FormSelect
                    required
                    label="Artists *"
                    onChange={inputChangeHandler}
                    value={state.artist}
                    name="artist"
                    options={artists}
                    error={getFieldError('artist')}
                />

                <FormSelect
                    required
                    label="Album *"
                    onChange={inputChangeHandler}
                    value={state.album}
                    name="album"
                    options={albums}
                    error={getFieldError('album')}
                />

                <FormElement
                    required
                    type="number"
                    label="Number"
                    onChange={inputChangeHandler}
                    value={state.number}
                    name="number"
                    error={getFieldError('number')}
                />

                <FormElement
                    required
                    label="Title"
                    onChange={inputChangeHandler}
                    value={state.title}
                    name="title"
                    error={getFieldError('title')}
                />

                <FormElement
                    required
                    label="Length"
                    onChange={inputChangeHandler}
                    value={state.length}
                    name="length"
                    error={getFieldError('length')}
                />

                <Grid item>
                    <Button type="submit" color="primary" variant="contained">Create</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TrackForm;