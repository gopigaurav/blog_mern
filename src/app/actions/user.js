import axios from "../../axios";

const headers = {
  "Content-Type": "application/json",
};
export const signUp = (data, history) => async (dispatch) => {
  try {
    const res = await axios.post("/register", data, {
      headers: headers,
    });
    if (res.status === 200) {
      history("/signin");
    }
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};
export const signIn = (data, history) => async (dispatch) => {
  try {
    const res = await axios.post("/login", data, {
      headers: headers,
    });
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(res.data));
      await dispatch(getLoggedIn());
      history("/")
    }
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

export const logwithGoogle = (data, history) => async (dispatch) => {
  try {
    const res = await axios.post("/googlelogin", data, {
      headers: headers,
    });
    if (res.status === 200) {
      localStorage.setItem("user",JSON.stringify(res.data));
      dispatch(getLoggedIn());
      history("/")
    }
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

export const getLoggedIn = () => async (dispatch) => {
  // const loggedInRes = await axios.get("http://localhost:5000/auth/loggedIn");
  try {
    const loggedInRes = await axios.get("http://localhost:5000/loggedIn");
    await dispatch({ type: "GET_LOGIN_STATE", payload: loggedInRes.data });
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};
export const logOut = () => async (dispatch) => {
  // const loggedInRes = await axios.get("http://localhost:5000/auth/loggedIn");
  try {
    const loggedInRes = await axios.get("http://localhost:5000/logout");
    dispatch({ type: "GET_LOGIN_STATE", payload: loggedInRes.data });
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};


