import React, { useState, useEffect, useRef } from "react";
import { Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import { createPost, updatePost, getPostsBySearch } from "../../app/actions/posts";
import { logOut } from "../../app/actions/user";
import useStyles from "./styles";
import { Container, Grow, Grid, AppBar, TextField } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
//import ChipInput from 'material-ui-chip-input';
//import { createPost, updatePost } from '../../actions/posts';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const UpdateForm = ({ currentId, setCurrentId }) => {
  const ref = useRef();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  //const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const classes = useStyles();
  const handleAddChip = (tag) => setTags([...tags, tag]);
  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));
  const navigate = useNavigate();
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    ref.current.state.files = [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.appBarSearch}
        position="static"
        color="inherit"
      >
        <TextField
          onKeyDown={handleKeyPress}
          name="search"
          variant="outlined"
          label="Search Memories"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/*<ChipInput
          style={{ margin: "10px 0" }}
          value={tags}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip) => handleDeleteChip(chip)}
          label="Search Tags"
          variant="outlined"
        />*/}
        <Button
          onClick={searchPost}
          className={classes.searchButton}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </AppBar>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase64
            type="file"
            ref={ref}
            multiple={false}
            value={postData.selectedFile}
            onDone={({ base64 }) => {
              setPostData({ ...postData, selectedFile: base64 });
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          //onClick={clear}
          onClick={() => dispatch(logOut())}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default UpdateForm;
