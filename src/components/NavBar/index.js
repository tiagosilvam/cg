import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Stack, Button } from "@mui/material";

// Styled component
import { Image } from "./styles.js";

export const NavBar = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="inherit">
        <Toolbar>
          <Image src="/img/logo.png" alt="" />
          <Typography
            ml={4}
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Projeto Computação Gráfica
          </Typography>
          <Stack direction="row">
            <Button color="inherit" href="/">Pixel</Button>
            <Button color="inherit" href="/reta">Reta</Button>
            <Button color="inherit" href="/circunferencia">Circunferencia</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
