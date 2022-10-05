import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";

const TrackForm = ({onSubmit, artists, error}) => {
    const [state, setState] = useState({
        number: "",
        title: "",
        artist: "",
        album: "",
        length: "",
    });

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });

        onSubmit(formData);
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
                <FormElement
                    // required
                    type="number"
                    label="Number"
                    onChange={inputChangeHandler}
                    value={state.number}
                    name="number"
                    error={getFieldError('number')}
                />

                <FormElement
                    // required
                    label="Title"
                    onChange={inputChangeHandler}
                    value={state.title}
                    name="title"
                    error={getFieldError('title')}
                />

                <FormSelect
                    // required
                    label="Artists"
                    onChange={inputChangeHandler}
                    value={state.artist}
                    name="artist"
                    options={artists}
                    error={getFieldError('artist')}
                />

                {/*<FormSelect*/}
                {/*    // required*/}
                {/*    label="Album"*/}
                {/*    onChange={inputChangeHandler}*/}
                {/*    value={state.album}*/}
                {/*    name="artist"*/}
                {/*    options={albums}*/}
                {/*    error={getFieldError('album')}*/}
                {/*/>*/}

                <Grid item>
                    <Button type="submit" color="primary" variant="contained">Create</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TrackForm;