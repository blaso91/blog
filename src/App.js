import CssBaseline from '@mui/material/CssBaseline';
import { useState } from "react";
import Header from "./components/Header";
import { Auth } from "./libs/api";
import RankingTable from './components/RankingTable';
import { Container, Grid } from '@mui/material';
import StatsTable from './components/StatsTable';
import { UserContextProvider } from './contexts/UserContext';

export function App() {
  return (
    <>
      <UserContextProvider>
        <CssBaseline />
        <Header />
        <Container sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <StatsTable />
            </Grid>
            <Grid item xs={4}>
              <RankingTable />
            </Grid>
          </Grid>
        </Container>
      </UserContextProvider>
    </>
  );
}