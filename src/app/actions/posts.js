import axios from "../../axios";
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/posts");
    console.log("called");
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const createPost = (newPost) => async (dispatch) => {
  try {
    await axios.post("/posts", newPost);
    console.log("to dispatch")
    await dispatch(getPosts());
  } catch (error) {
    console.log(error.message);
  }
};
export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    await axios.patch(`/posts/${id}`, updatedPost);
    await dispatch(getPosts());
  } catch (error) {
    console.log(error.message);
  }
};
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/posts/${id}/likePost`);
    //dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`posts/${id}`);
    //dispatch({ type: DELETE, payload: id });
    await dispatch(getPosts());
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    //dispatch({ type: START_LOADING });
    const { data: { data } } = await axios.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);;
    //dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    //dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};