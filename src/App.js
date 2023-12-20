import CssBaseline from '@mui/material/CssBaseline';
import { useState } from "react";
import Header from "./components/Header";
import { Auth } from "./libs/api";
import RankingTable from './components/RankingTable';
import { Container, Grid } from '@mui/material';
import StatsTable from './components/StatsTable';
import { UserContextProvider } from './contexts/UserContext';
import { StatsContextProvider } from './contexts/StatsContext';

export function App() {
  return (
    <>
      <StatsContextProvider>
        <UserContextProvider>
          <CssBaseline />
          <Header />
          <Container sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <StatsTable />
              </Grid>
              <Grid item xs={5}>
                <RankingTable />
              </Grid>
            </Grid>
          </Container>
        </UserContextProvider>
      </StatsContextProvider>
    </>
  );
}