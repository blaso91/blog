import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Auth, Posts } from "./libs/api";
import Post from "./components/Post";
import RankingTable from './components/RankingTable';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import StatsTable from './components/StatsTable';
import { UserContext } from './contexts/UserContext';

export function App() {
  // const [posts, setPosts] = useState([])
  // const [start, setStart] = useState(0);
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  const [count] = useState(10);
  const [open, setOpen] = useState(user ? false : true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogin = async () => {
    const res = await Auth.Login(email, password);
    if (res) {
      setUser(res);
      localStorage.setItem('user', JSON.stringify(res));
      setOpen(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };
  // async function GetPosts() {
  //   setPosts(await Posts.GetList(start, count))
  // }

  // useEffect(() => {
  //   GetPosts();
  // }, [])

  return (
    <>
      <UserContext.Provider value={user}>
        <CssBaseline />
        <Header />

        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StatsTable />
            </Grid>
            <Grid item xs={8}>
              {/* <div className="posts-list">
              {posts.map(post => <Post key={post.id} title={post.title} text={post.body} />)}
            </div> */}
            </Grid>
            <Grid item xs={4}>
              <RankingTable />
            </Grid>
          </Grid>
        </Container>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={e => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleLogin}>Login</Button>
          </DialogActions>
        </Dialog>
      </UserContext.Provider>
    </>
  );
}