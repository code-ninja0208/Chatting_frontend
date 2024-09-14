import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import DialogBox from './DialogBox';
import CreateGroup from '../pages/Main/CreateGroup';
import DarkModeSwitch from './DarkModeSwitch';

import { Button, Typography, Avatar } from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const UserButtonsDesktop = ({ user, handleLogout, isMobile }) => {
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null); // State to store the selected avatar
  const classes = useNavStyles();

  if (isMobile) return null;

  const handleAvatarClick = () => {
    document.getElementById('avatarFileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedAvatar(fileUrl); 
      // Optionally, you can also upload the file to the server here
    }
  };

  const avatarSrc = selectedAvatar
    ? selectedAvatar
    : user?.profile
    ? user?.profile.avatarUrl
    : `https://secure.gravatar.com/avatar/${user?.id}?s=150&d=retro`;

  return (
    <div>
      {user ? (
        <div className={classes.rightBtnWrapper}>
          <div className={classes.userInfo}>
            <Avatar
              alt={user.username}
              src={avatarSrc}
              className={classes.avatar}
              onClick={handleAvatarClick} 
              style={{ cursor: 'pointer' }} 
            />
            <Typography color="secondary" variant="body1">
              {user.username}
            </Typography>
            <input
              id="avatarFileInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange} 
            />
          </div>
          <DialogBox
            title="Create A Group"
            modalOpen={createGroupModal}
            setModalOpen={setCreateGroupModal}
            triggerButton={
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={() => setCreateGroupModal(true)}
                startIcon={<GroupAddIcon />}
              >
                Create Group
              </Button>
            }
            children={
              <CreateGroup closeModal={() => setCreateGroupModal(false)} />
            }
          />
          <Button
            color="primary"
            variant="contained"
            size="small"
            className={classes.lastBtn}
            onClick={handleLogout}
            startIcon={<PowerSettingsNewIcon />}
          >
            Logout
          </Button>
          <DarkModeSwitch />
        </div>
      ) : (
        <div>
          <Button
            color="primary"
            variant="contained"
            size="small"
            component={RouterLink}
            to="/login"
            startIcon={<ExitToAppIcon />}
          >
            Login
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="small"
            className={classes.lastBtn}
            component={RouterLink}
            to="/register"
            startIcon={<PersonAddIcon />}
          >
            Register
          </Button>
          <DarkModeSwitch />
        </div>
      )}
    </div>
  );
};

export default UserButtonsDesktop;
