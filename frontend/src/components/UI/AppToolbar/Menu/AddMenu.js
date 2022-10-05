import {useState} from "react";
import * as React from 'react';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const AddMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                color="inherit"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Add new item
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose} component={Link} to="/artist/new">Add artist</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/album/new">Add album</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/track/new">Add track</MenuItem>
            </Menu>
        </div>
    );
};

export default AddMenu;
