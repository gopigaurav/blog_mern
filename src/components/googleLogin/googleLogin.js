import { GoogleLogin } from "react-google-login";
import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";
import {logwithGoogle} from "../../app/actions/user"
function GoogleLoginn() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    //const token = res?.tokenId;
    const { imageUrl, name, email } = result;
    const data = {imageUrl, name, email}
    try {
      dispatch(logwithGoogle(data, history));
    } catch (error) {
      console.log(error);
    }
  };
  const classes = useStyles();
  const googleError = () =>
    alert("Google Sign In was unsuccessful. Try again later");
  return (
    <div>
      <GoogleLogin
        clientId="989925490097-d9hjfnp27h4pr6g8ht2shdm4rrg6eoq0.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button
            className={classes.googleButton}
            color="primary"
            fullWidth
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<Icon />}
            variant="contained"
          >
            Google Sign In
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleError}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
}

const Icon = () => (
  <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
    />
  </svg>
);

export default GoogleLoginn;
