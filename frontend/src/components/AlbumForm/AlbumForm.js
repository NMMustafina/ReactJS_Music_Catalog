import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import FileInput from "../UI/Form/FileInput/FileInput";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";

const AlbumForm = ({onSubmit, artists, error}) => {
    const [state, setState] = useState({
        artist: "",
        title: "",
        year: "",
        image: "",
    });

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });

        onSubmit(formData, state.artist);
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setState(prevState => ({...prevState, [name]: file}));
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
                    type="number"
                    label="Year"
                    onChange={inputChangeHandler}
                    value={state.year}
                    name="year"
                    error={getFieldError('year')}
                />

                <Grid item>
                    <FileInput
                        label="Image"
                        name="image"
                        onChange={fileChangeHandler}
                    />
                </Grid>

                <Grid item>
                    <Button type="submit" color="primary" variant="contained">Create</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AlbumForm;