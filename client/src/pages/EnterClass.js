import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchEnterClassDetails } from "../actions/class";
import Announcement from "../components/UI/Announcement";
import Banner from "../components/UI/Banner";

import Button from "@material-tailwind/react/Button";
import { fetchAnnouncements } from "../actions/announcement";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";
import UserAnnouncement from "../components/UI/UserAnnouncement";
import { Link } from "react-router-dom";
import { fetchPendingTasks } from "../actions/assignment";


const EnterClass = () => {
  const urlParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");

  const { loading, error, announcements } = useSelector(
    (state) => state.fetchAnnouncements
  );
  const { isAuthenticated, userInfo } = useSelector(
    (state) => state.userDetails
  );
  const { className, room, subject, createdBy } = useSelector(
    (state) => state.enterClassDetails
  );
  const {
    quizzes,
    assignments,
    loading: fetchPendingLoading,
    error: fetchPendingError,
  } = useSelector((state) => state.fetchPendingTasks);

  const classId = urlParams.classId;

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }

    dispatch(fetchEnterClassDetails(classId));
    dispatch(fetchAnnouncements(classId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (createdBy && createdBy !== userInfo.id)
      dispatch(fetchPendingTasks(classId));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdBy, userInfo, classId]);

  const joinMeetScreen = () => {
    if (roomId) navigate(`/join/meet?roomId=${roomId}`);
  };

  const createMeetScreen = () => {
    navigate("/join/meet");
  };
  return (
    <div>
      <Banner
        
        heading={className ? className : "Loading...."}
        customText={subject && room && `${subject}, ${room}`}
        textColor="gray"
      />
      <div className="flex flex-row justify-around p-6 sm:flex-col sm:p-2">
        <div className="flex flex-col">
          <div className="flex flex-col items-center shadow-lg p-6 bg-white h-56 rounded-lg sm:mb-4 mb-2 sm:w-80 sm:mx-auto">
            <div className="flex flex-col items-center">
              <input
                className="w-full shadow appearance-none border rounded my-2 py-2 px-3 mx-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter meet id"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <Button
                color="blue"
                ripple="light"
                onClick={joinMeetScreen}
                buttonType="outline"
                className="w-48 mb-7 mt-3"
              >
                Join meet
              </Button>
            </div>
            
            <div className="w-full flex justify-center">
              <Button
                color="green"
                ripple="light"
                onClick={createMeetScreen}
                buttonType="outline"
                className="w-48 mb-4"
              >
                Create new meet
              </Button>
            </div>
          </div>
          {createdBy && createdBy !== userInfo.id && (
            <div
              className="flex flex-col items-start  shadow-lg p-6 bg-white  rounded-lg sm:mb-4 sm:w-80 sm:mx-auto "
              style={{
                minHeight: "208px",
              }}
            >
              <h1
                className="w-full mb-2"
                style={{
                  borderBottom: "1px solid black",
                }}
              >
                Pending tasks
              </h1>

              <div className="flex flex-col">
                {fetchPendingLoading ? (
                  <div
                    className="flex items-center items-center justify-center mx-auto w-full"
                    style={{
                      fontFamily: ["Poppins", "sans-serif"],
                    }}
                  >
                    <p>Loading...</p>
                  </div>
                ) : fetchPendingError ? (
                  <div className="w-60 mx-auto">
                    <Alert color="red" message={fetchPendingError} />
                  </div>
                ) : (
                  <>
                    {quizzes &&
                      quizzes.map((quiz) => (
                        <Link
                          key={quiz._id}
                          className="underline text-lg text-blue-400"
                          to={`/enter/class/${classId}/classwork/quiz/${quiz._id}`}
                        >
                          {quiz.title}
                        </Link>
                      ))}
                    {assignments &&
                      assignments.map((assignment) => (
                        <Link
                          key={assignment._id}
                          className="underline text-lg text-blue-400"
                          to={`/enter/class/${classId}/classwork/assignment/${assignment._id}`}
                        >
                          {assignment.title}
                        </Link>
                      ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="shadow-lg  rounded-lg bg-white w-2/3 sm:w-full sm:mx-auto">
          {isAuthenticated && <Announcement />}

          <div className="flex flex-col p-4 sm:p-0">
            {loading ? (
              <div className="my-4">
                <Spinner />
              </div>
            ) : error ? (
              <div className="w-4/5 mx-auto">
                <Alert color="red" message={error} />
              </div>
            ) : (
              announcements &&
              announcements.map((announcement) => (
                <UserAnnouncement
                  key={announcement._id}
                  announcementId={announcement._id}
                  userId={userInfo.id}
                  announcementMadeBy={announcement.user._id}
                  name={announcement.user.name}
                  picture={announcement.user.picture}
                  content={announcement.content}
                  time={announcement.createdAt}
                  classId={classId}
                />
              ))
            )}
          </div>
          {announcements && announcements.length === 0 && (
            <div
              className="mx-auto w-60 h-auto"
              style={{
                fontFamily: ["Poppins", "sans-serif"],
              }}
            >
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnterClass;
