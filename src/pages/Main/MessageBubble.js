import { useState } from 'react';
import { useAuthContext } from '../../context/auth';
import { formatTime } from '../../utils/helperFuncs';

import { Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useConversationPageStyles } from '../../styles/muiStyles';

const MessageBubble = ({ message, onEdit, onDelete }) => {
  const classes = useConversationPageStyles();
  const { user } = useAuthContext();
  const [isClicked, setIsClicked] = useState(false);  // State to track if the message is clicked

  const isSentMsg = message.senderId === user.id;

  // Toggle the clicked state
  const handleMessageClick = () => {
    setIsClicked(prevState => !prevState);
  };

  return (
    <div className={classes.messageWrapper} onClick={handleMessageClick}>
      <div className={isSentMsg ? classes.sentMsg : classes.receivedMsg}>
        <Typography className={classes.msgText}>{message.body}</Typography>
        <Typography variant="caption" className={classes.msgTime}>
          {formatTime(message.createdAt)}
        </Typography>
      </div>

      {/* Conditionally render edit/delete icons when the message is clicked */}
      {isClicked && (
        <div className={classes.iconWrapper}>
          <IconButton
            aria-label="edit message"
            onClick={(e) => {
              e.stopPropagation();  // Prevent click event from propagating to the message bubble
              onEdit(message);
            }}
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            aria-label="delete message"
            onClick={(e) => {
              e.stopPropagation();  // Prevent click event from propagating to the message bubble
              onDelete(message.id);
            }}
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
