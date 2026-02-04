import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Collapse, IconButton, TextField, Checkbox } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import { useTodoContext } from '../contexts/TodoContext';

const TodoItem = ({ todo, index }) => {
  const { updateTodo, deleteTodo, toggleTodoComplete } = useTodoContext();
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDueDate, setEditDueDate] = useState(
    todo.dueDate ? dayjs(todo.dueDate) : null
  );
  const [error, setError] = useState('');

  const handleEdit = () => {
    if (todo.completed) return;
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditDueDate(todo.dueDate ? dayjs(todo.dueDate) : null);
    setError('');
  };

  const handleSave = () => {
    setError('');
    try {
      const dateValue = editDueDate ? editDueDate.toISOString() : null;
      updateTodo(todo.id, editTitle, dateValue);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDueDate(todo.dueDate ? dayjs(todo.dueDate) : null);
    setError('');
  };

  const handleDelete = () => {
    if (todo.completed) return;
    try {
      deleteTodo(todo.id);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleComplete = () => {
    try {
      toggleTodoComplete(todo.id);
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return dayjs(dateString).format('YYYY-MM-DDTHH:mm');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
          mb: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={todo.completed}
            onChange={handleToggleComplete}
            color="primary"
            sx={{ mr: 1 }}
          />
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'text.secondary' : 'text.primary',
            }}
          >
            {index + 1}. {todo.title} - {formatDate(todo.dueDate)}
          </Typography>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            size="small"
            sx={{ ml: 1 }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        <Collapse in={expanded}>
          <Box sx={{ mt: 2 }}>
            {isEditing ? (
              <Grid container spacing={2}>
                {error && (
                  <Grid item xs={12}>
                    <Typography color="error" variant="caption">
                      {error}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Todo Title *"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DateTimePicker
                    label="Todo Due Date"
                    value={editDueDate}
                    onChange={(newValue) => setEditDueDate(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      color="primary"
                    >
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    {todo.completed ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleToggleComplete}
                          size="small"
                        >
                          UNDO
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          disabled
                          size="small"
                        >
                          EDIT
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          disabled
                          size="small"
                        >
                          DELETE
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleToggleComplete}
                          size="small"
                        >
                          COMPLETE
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleEdit}
                          size="small"
                        >
                          EDIT
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={handleDelete}
                          size="small"
                        >
                          DELETE
                        </Button>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        </Collapse>
      </Box>
    </LocalizationProvider>
  );
};

export default TodoItem;

