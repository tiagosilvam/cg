import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";

// Styled component
import { Image } from "./styles.js";

export const NavBar = () => {
  const navItems = ["Pixel", "Reta", "Home"];

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
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }} href={item.toLocaleLowerCase()}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
