import React, { useState } from "react";
import { Box, TextField, Button, Grid, Alert } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useTodoContext } from "../contexts/TodoContext";

const TodoForm = () => {
  const { addTodo } = useTodoContext();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(dayjs("2022-04-15T15:30"));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const dateValue = dueDate ? dueDate.toISOString() : null;
      addTodo(title, dateValue);
      setTitle("");
      setDueDate(dayjs("2022-04-15T15:30"));
      setSuccess("Todo added successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          {success && (
            <Grid item xs={12}>
              <Alert severity="success">{success}</Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Todo Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <DateTimePicker
              label="Todo Due Date"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: { mb: 2 },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ py: 1.5 }}
            >
              ADD TODO
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default TodoForm;
