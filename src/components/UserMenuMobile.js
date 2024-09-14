import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import DialogBox from './DialogBox';
import CreateGroup from '../pages/Main/CreateGroup';
import DarkModeSwitch from './DarkModeSwitch';

import { IconButton, Menu, MenuItem, Avatar } from '@material-ui/core';
import { useMenuStyles } from '../styles/muiStyles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SettingsIcon from '@material-ui/icons/Settings';  // Add icon for Profile Settings

const MobileUserMenu = ({ user, handleLogout, isMobile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null); // State to store the selected avatar
  const classes = useMenuStyles();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleLogout();
    handleCloseMenu();
  };

  const handleCreateGroupModal = () => {
    setCreateGroupModal(true);
    handleCloseMenu();
  };

  const handleProfileSettingsClick = () => {
    // Trigger the hidden file input when Profile Settings is clicked
    document.getElementById('avatarFileInputMobile').click();
    handleCloseMenu(); // Close the menu after triggering the input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedAvatar(fileUrl); // Store the selected file URL in state
      // Optionally, you can upload the file to the server here
    }
  };

  const avatarSrc = selectedAvatar
    ? selectedAvatar
    : user?.profile
    ? user?.profile.avatarUrl
    : `https://secure.gravatar.com/avatar/${user?.id}?s=150&d=retro`;

  if (!isMobile) return null;

  return (
    <div>
      <DarkModeSwitch />
      {user ? (
        <IconButton onClick={handleOpenMenu} className={classes.userBtnMob}>
          <Avatar
            alt={user.username}
            src={avatarSrc} // Display selected avatar or fallback
            className={classes.avatar}
            variant="rounded"
            style={{ cursor: 'pointer' }}
          />
          <MoreVertIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton
          onClick={handleOpenMenu}
          color="primary"
          className={classes.moreBtn}
        >
          <MoreVertIcon color="primary" />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        marginThreshold={0}
        elevation={1}
      >
        {user ? (
          <div>
            {/* Profile Settings Option */}
            <MenuItem onClick={handleProfileSettingsClick}>
              <SettingsIcon className={classes.menuIcon} />
              Profile Settings
            </MenuItem>
            {/* Hidden file input for selecting avatar */}
            <input
              id="avatarFileInputMobile"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange} // Handle file selection
            />

            <DialogBox
              title="Create A Group"
              modalOpen={createGroupModal}
              setModalOpen={setCreateGroupModal}
              triggerButton={
                <MenuItem onClick={handleCreateGroupModal}>
                  <PeopleAltIcon className={classes.menuIcon} />
                  Create Group
                </MenuItem>
              }
              children={
                <CreateGroup closeModal={() => setCreateGroupModal(false)} />
              }
            />
            <MenuItem onClick={handleLogoutClick}>
              <PowerSettingsNewIcon className={classes.menuIcon} />
              Logout: {user.username}
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem
              component={RouterLink}
              to="/login"
              onClick={handleCloseMenu}
            >
              <ExitToAppIcon className={classes.menuIcon} />
              Log In
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/register"
              onClick={handleCloseMenu}
            >
              <PersonAddIcon className={classes.menuIcon} />
              Sign Up
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default MobileUserMenu;
