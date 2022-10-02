import Button from "@material-tailwind/react/Button";
import React, { useState } from "react";
import CreateClassForm from "../CreateClassForm";
import JoinClassForm from "../JoinClassForm";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/user";
import Spinner from "./Spinner";

const HeaderHome = () => {
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showJoinClass, setShowJoinClass] = useState(false);

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.userLogout);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <header className="p-4 h-16 flex w-full justify-between items-center sm:h-42" style={{boxShadow:"0 10px 12px -1px rgba(0, 0, 0, 0.1)"}}>
        
        <div className="flex flex-row sm:flex-col items-center">
          <Button
            color="blue"
            ripple="light"
            size="sm"
            onClick={(e) => setShowCreateClass(true)}
            buttonType="outline"
            className="p-0 h-8"
          >
            Create class
          </Button>
          <Button
            color="green"
            ripple="light"
            size="sm"
            onClick={(e) => setShowJoinClass(true)}
            buttonType="outline"
            className="p-0 h-8 mx-2 sm:my-2"
          >
            Join class
          </Button>

          

          {loading ? (
            <Spinner />
          ) : (
            <Button
              color="red"
              ripple="light"
              size="sm"
              onClick={logoutHandler}
              // buttonType="outline"
              className="p-0 h-8 mx-10"
            >
              Logout
            </Button>
          )}
        </div>
      </header>

      <CreateClassForm
        showCreateClass={showCreateClass}
        setShowCreateClass={setShowCreateClass}
      />
      <JoinClassForm
        showJoinClass={showJoinClass}
        setShowJoinClass={setShowJoinClass}
      />
      
    </>
  );
};

export default HeaderHome;
