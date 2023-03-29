// Components
import { NavBar } from "./components/NavBar";

// Routes
import { AppRoutes } from "./routes";

// MUI
import { CssBaseline } from "@mui/material";

// Styled
import styled from "styled-components";

// theme
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Container>
        <AppRoutes />
      </Container>
    </ThemeProvider>
  );
}

export default App;
