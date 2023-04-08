import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Quizzes from "../../components/listItems/students/Quizzes";
import QuizMarkStat from "../../components/tables/students/QuizMarkStat";
import NotFoundError from "../../components/ui/Errors/NotFoundError";
import QuizzesLoader from "../../components/ui/Loader/QuizzesLoader";
import { useGetQuizMarkForUserQuery } from "../../features/quizMark/quizMarkApi";
import { useGetVidoeQuizzesQuery } from "../../features/quizzes/quizzesApi";
import { useGetSingleVideoQuery } from "../../features/videos/videoApi";
import { transformQuizOptions } from "../../utils/transformQuizOptions";

export default function Quiz() {
  // Fetch data of current loggne-in user
  const user = useSelector((state) => state.auth.user);

  // Local states
  const [submittedQuiz, setSubmittedQuiz] = useState({});
  const [redirect, setRedirect] = useState(false);

  // Dependencies
  const { videoId } = useParams();
  const {
    data: video,
    isLoading: videoLoading,
    isError: videoError,
  } = useGetSingleVideoQuery(videoId);
  const {
    data: quizzes,
    isLoading: quizesLoading,
    isError: quizzesError,
  } = useGetVidoeQuizzesQuery(videoId);
  const {
    data: quizMark,
    isLoading: markLoading,
    isError: markError,
  } = useGetQuizMarkForUserQuery({ userId: user?.id, videoId: videoId });

  const transformQuizzes = transformQuizOptions(quizzes);
  useEffect(() => {
    if (quizMark && quizMark.length > 0) {
      setSubmittedQuiz(quizMark[0]);
    }
  }, [quizMark]);
  // Decide what to render
  let content = "";
  if (quizesLoading || markLoading || videoLoading) {
    content = <QuizzesLoader />;
  } else if (quizzesError || markError || videoError) {
    content = <NotFoundError message="There was some error!" />;
  } else if (quizzes.length === 0) {
    content = <NotFoundError message="No quizzes found!" />;
  } else if (submittedQuiz?.id) {
    content = (
      <>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Quizzes for "Debounce Function in JavaScript - JavaScript Job
            Interview question"
          </h1>
        </div>
        <div className="space-y-8 ">
          <div className="quiz-result-container">
            {redirect ? (
              <>
                <h2 className="container-title">
                  You will redirect to leaderboard within 5 second...
                </h2>
                <div className="redirectProgress"></div>
              </>
            ) : (
              <h2 className="container-title">
                You have already submitted quizzess for this video!
              </h2>
            )}
            <div className="quiz-result">
              <QuizMarkStat quizMark={submittedQuiz} />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Quizzes for "Debounce Function in JavaScript - JavaScript Job
            Interview question"
          </h1>

          <p className="text-sm text-slate-200">
            Each question contains 5 Mark
          </p>
        </div>
        <div className="space-y-8 ">
          <Quizzes
            data={transformQuizzes}
            submittedQuizHandler={setSubmittedQuiz}
            video={video}
            user={user}
            redirectHandler={setRedirect}
          />
        </div>
      </>
    );
  }
  return content;
}
