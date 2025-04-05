import React, { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Fullscreen as FullscreenIcon } from '@mui/icons-material';

const TaskItem = ({ task }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { deleteTask, setCurrent, updateTask } = useContext(TaskContext);
  const { _id, title, description, completed } = task;

  // Function to truncate description text
  const truncateDescription = (text, maxLines = 2) => {
    if (!text) return '';
    const words = text.split(' ');
    // Approximate 10 words per line, so limit to maxLines * 10 words
    const maxWords = maxLines * 10;
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  const onDelete = () => {
    deleteTask(_id);
  };

  const onEdit = () => {
    setCurrent(task);
  };

  const toggleComplete = () => {
    updateTask({ ...task, completed: !completed });
  };

  return (
    <ListItem
      sx={{
        mb: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
        p: 2,
        display: 'flex',
        alignItems: 'flex-start',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <Checkbox
        edge="start"
        checked={completed}
        onChange={toggleComplete}
        color="primary"
        sx={{ mt: 0.5, mr: 1 }}
      />
      <ListItemText
        primary={
          <Typography
            variant="h6"
            style={{
              textDecoration: completed ? 'line-through' : 'none',
              color: completed ? 'text.disabled' : 'text.primary',
              marginBottom: '4px',
            }}
          >
            {title}
          </Typography>
        }
        secondary={
          description && (
            <Typography
              variant="body2"
              style={{
                textDecoration: completed ? 'line-through' : 'none',
                color: completed ? 'text.disabled' : 'text.secondary',
                display: showFullDescription ? 'block' : '-webkit-box',
                WebkitLineClamp: showFullDescription ? 'unset' : 2,
                WebkitBoxOrient: 'vertical',
                overflow: showFullDescription ? 'visible' : 'hidden',
                textOverflow: showFullDescription ? 'clip' : 'ellipsis',
                maxWidth: '90%',
                wordBreak: 'break-word',
                maxHeight: showFullDescription ? 'none' : '2.8em',
                transition: 'max-height 0.3s ease',
              }}
            >
              {showFullDescription ? description : truncateDescription(description)}
            </Typography>
          )
        }
        sx={{ mr: 10 }} // Increased margin to create more space between text and buttons
      />
      <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center', top: '50%', transform: 'translateY(-50%)', right: '16px' }}>
        <IconButton 
          aria-label="expand" 
          onClick={() => setShowFullDescription(!showFullDescription)} 
          color="info" 
          size="medium" 
          title="View full description"
        >
          <FullscreenIcon />
        </IconButton>
        <IconButton aria-label="edit" onClick={onEdit} color="primary" size="medium" sx={{ ml: 1 }}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={onDelete} color="error" size="medium" sx={{ ml: 1 }}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TaskItem;
