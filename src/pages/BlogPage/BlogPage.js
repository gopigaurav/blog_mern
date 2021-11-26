import { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Posts from "../../components/Posts/Posts";
import Form from "../../components/UpdateForm/UpdateForm";
import { getPosts } from "../../app/actions/posts";
//import { getPosts } from "./actions/posts";
import classes from "./BlogPage.module.css";
function BlogPage() {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <>
      <Container maxWidth="lg">
          <Typography className={classes.heading} variant="h4" align="center">
            Blogs
          </Typography>
        <Grow in>
          <Container>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
}

export default BlogPage;
