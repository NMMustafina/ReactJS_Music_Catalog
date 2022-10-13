import {useState} from "react";
import * as React from 'react';
import {useDispatch} from "react-redux";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Avatar} from "@mui/material";
import {logoutUser} from "../../../../store/actions/usersActions";
import imageNotAvailable from '../../../../assets/image-not-available.jpg';
import {apiUrl} from "../../../../config";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    let avatarImage = imageNotAvailable;

    if (user.avatarImage && user.facebookId) {
        avatarImage = user.avatarImage;
    } else if (user.avatarImage) {
        avatarImage = apiUrl + '/' + user.avatarImage;
    }

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
                sx={{ml: 5}}
            >
                <Avatar alt={user.displayName} src={avatarImage} sx={{width: 32, height: 32, mr: 1}}/>
                Hello, {user.displayName}!
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
                <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;
