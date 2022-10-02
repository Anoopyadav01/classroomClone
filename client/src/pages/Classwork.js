import React, { useEffect } from "react";
import Dropdown from "../components/UI/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignments } from "../actions/assignment";
import { useLocation, useNavigate } from "react-router";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";
import Banner from "../components/UI/Banner";

import TabComponent from "../components/TabComponent";
import { fetchEnterClassDetails } from "../actions/class";

const Classwork = () => {
  const { quizzes, loading, error, assignments } = useSelector(
    (state) => state.assignmentDetails
  );
  const { createdBy } = useSelector((state) => state.enterClassDetails);
  const { isAuthenticated } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const urlPath = location.pathname;
  const classId = urlPath.split("/")[3];

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }
    dispatch(fetchEnterClassDetails(classId));
    dispatch(fetchAssignments(classId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      <Banner
        
        heading="Classwork"
        
        
        textColor="gray"
      />
      {/* {quizzes && (
       
      )} */}

      <div className="mx-36 my-8 sm:mx-auto">
        <div className="my-4 mx-auto sm:flex sm:justify-center sm:items-center">
          {userInfo && userInfo.id === createdBy && <Dropdown />}
        </div>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert message={error} color="red" />
        ) : (
          quizzes && (
            <TabComponent
              categories={{
                Quizzes: quizzes,
                Assignments: assignments,
              }}
              createdBy={createdBy}
              userInfo={userInfo}
            />
          )
          // quizzes.map((quiz) => (
          //   <QuizBanner questions={quiz.questions} quizId={quiz._id} />
          // ))
        )}
      </div>
    </>
  );
};

export default Classwork;
