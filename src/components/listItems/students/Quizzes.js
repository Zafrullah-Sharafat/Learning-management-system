import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddQuizMarkMutation } from "../../../features/quizMark/quizMarkApi";
import { quizMarkCalculator } from "../../../utils/quizMarkCalculator";

export default function Quizzes({
  data = [],
  submittedQuizHandler,
  redirectHandler,
  video = {},
  user = {},
}) {
  // Dependencies
  const navigate = useNavigate();
  const [addQuizMark, { data: submittedQuiz, isSuccess }] =
    useAddQuizMarkMutation();

  // Local States
  const [quizzes, setQuizzes] = useState(data);

  // Side Effects
  useEffect(() => {
    if (isSuccess) {
      submittedQuizHandler(submittedQuiz);
      redirectHandler(true);
      setTimeout(() => {
        navigate("/leaderboard");
      }, 5000);
    }
  }, [
    isSuccess,
    submittedQuizHandler,
    submittedQuiz,
    redirectHandler,
    navigate,
  ]);

  //  Option change Handler
  const handleChange = (quizId, optionId, value) => {
    const quizzesClone = _.cloneDeep(quizzes);
    const quiz = quizzesClone.find((quiz) => +quiz.id === +quizId);
    const option = quiz?.options.find((option) => +option.id === +optionId);
    option.isMarked = value;
    setQuizzes(quizzesClone);
  };

  // Quiz submit handler
  const submitQuiz = () => {
    // Calculate quiz mark
    const { totalQuiz, mark, totalMark, totalCorrect, totalWrong } =
      quizMarkCalculator(quizzes);
    const data = {
      student_id: user?.id,
      student_name: user?.name,
      video_id: video?.id,
      video_title: video?.title,
      totalQuiz,
      totalCorrect,
      totalWrong,
      totalMark,
      mark,
    };

    // Add quiz mark
    addQuizMark(data);
  };

  return (
    <>
      {quizzes.map((quiz) => (
        <div className="quiz" key={quiz.id}>
          <h4 className="question">{quiz.question}</h4>
          <form className="quizOptions">
            {quiz.options.map((option) => (
              <label
                htmlFor={`option${quiz.id}_q${option.id}`}
                key={`${quiz.id}&${option.id}`}
              >
                <input
                  type="checkbox"
                  id={`option${quiz.id}_q${option.id}`}
                  value={option?.isMarked}
                  onChange={(e) =>
                    handleChange(quiz?.id, option?.id, e.target.checked)
                  }
                />{" "}
                {option.option}
              </label>
            ))}
          </form>
        </div>
      ))}

      <button
        className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95"
        onClick={submitQuiz}
      >
        Submit
      </button>
    </>
  );
}
