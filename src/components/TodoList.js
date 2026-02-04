import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import TodoItem from './TodoItem';
import { useTodoContext } from '../contexts/TodoContext';

const TodoList = ({ type = 'pending' }) => {
  const { pendingTodos, completedTodos } = useTodoContext();
  const todos = type === 'pending' ? pendingTodos : completedTodos;
  const title = type === 'pending' ? 'Pending Tasks' : 'Completed Tasks';

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
        {title}
      </Typography>
      {todos.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No {type} tasks
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {todos.map((todo, index) => (
            <Grid item xs={12} key={todo.id}>
              <TodoItem todo={todo} index={index} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TodoList;

