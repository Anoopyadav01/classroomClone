import React, { useEffect} from "react";
import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";

import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../actions/user";
import { useNavigate } from "react-router";

import Spinner from "../components/UI/Spinner";
import '../styles/loginPage.css';

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { isAuthenticated, loading } = userDetails;

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  
  const onSuccessHandler = (res) => {
    console.log(res);
    dispatch(userLogin(res.tokenId));
  };

  return (
    <>
    <div className='mainContainer'>
            <div className='loginContainer'>
                <div className='text'>Login</div>
                {loading ? (
              <Spinner />
            ) : (
              <GoogleLogin
                clientId='305688550362-cro5mop64f08jh29pf0bu0apgqt3okep.apps.googleusercontent.com'
                // buttonText="Sign in with Google"
                render={(renderProps) => (
                  <GoogleButton
                    onClick={() => renderProps.onClick()}
                    //disabled={renderProps.disabled}
                  >
                    Sign in with Google
                  </GoogleButton>
                )}
                onSuccess={(onSuccessHandler)}
                cookiePolicy={"single_host_origin"}
                style={{
                  color: "red",
                }}
              />
            )}
            </div>
            
        </div>
      
    </>
  );
};

export default Welcome;
