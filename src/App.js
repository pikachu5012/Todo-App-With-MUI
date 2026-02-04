import React from "react";
import { Container, Box, Button, IconButton, Badge, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { ThemeContextProvider, useThemeContext } from "./contexts/ThemeContext";
import { TodoContextProvider, useTodoContext } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const AppContent = () => {
  const { mode, toggleTheme } = useThemeContext();
  const { notificationCount } = useTodoContext();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleTheme}
          sx={{ textTransform: "none" }}
        >
          TOGGLE TO {mode === "light" ? "DARK" : "LIGHT"} THEME
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Todo App
        </Typography>
        <Badge badgeContent={notificationCount} color="primary">
          <IconButton color="inherit">
            <MailIcon />
          </IconButton>
        </Badge>
      </Box>

      <TodoForm />
      <TodoList type="pending" />
      <TodoList type="completed" />
    </Container>
  );
};

const App = () => {
  return (
    <ThemeContextProvider>
      <TodoContextProvider>
        <AppContent />
      </TodoContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
