import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddQuizMutation,
  useEditQuizMutation,
} from "../../../features/quizzes/quizzesApi";
import { useGetVideosQuery } from "../../../features/videos/videoApi";

// Option object
const optionProperties = { option: "", isCorrect: false };

export default function QuizForm({ formData = {} }) {
  //Dependencies
  const navigate = useNavigate();
  const { data: videos } = useGetVideosQuery();
  const [addQuiz, { isSuccess }] = useAddQuizMutation();
  const [editQuiz, { isSuccess: editSuccess }] = useEditQuizMutation();

  // Local States
  const [question, setQuestion] = useState("");
  const [videoId, setVideoId] = useState("");
  const [option1, setOption1] = useState({
    id: 1,
    ...optionProperties,
  });
  const [option2, setOption2] = useState({
    id: 2,
    ...optionProperties,
  });
  const [option3, setOption3] = useState({
    id: 3,
    ...optionProperties,
  });
  const [option4, setOption4] = useState({
    id: 4,
    ...optionProperties,
  });

  // Side Effects
  useEffect(() => {
    // If quiz id exist then fillup the form with quiz data
    if (formData?.id) {
      const option1 = formData?.options.find((option) => +option.id === 1);
      const option2 = formData?.options.find((option) => +option.id === 2);
      const option3 = formData?.options.find((option) => +option.id === 3);
      const option4 = formData?.options.find((option) => +option.id === 4);
      setQuestion(formData?.question);
      setVideoId(formData?.video_id);
      setOption1(option1);
      setOption2(option2);
      setOption3(option3);
      setOption4(option4);
    }
  }, [formData, navigate]);

  useEffect(() => {
    if (isSuccess || editSuccess) {
      navigate("/admin/quizzes");
    }
  }, [isSuccess, editSuccess, navigate]);
  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const video = videos.find((video) => +video.id === +videoId);
    const data = {
      question: question,
      video_id: video?.id,
      video_title: video?.title,
      options: [{ ...option1 }, { ...option2 }, { ...option3 }, { ...option4 }],
    };

    // If id of quiz found then edit else add the quiz
    if (formData?.id) {
      editQuiz({ id: formData.id, data: data });
    } else {
      addQuiz(data);
    }
  };

  return (
    <form className="add-edit-form" onSubmit={handleSubmit}>
      <div className="mb-1">
        <label htmlFor="question">Question</label>
        <input
          id="question"
          name="question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          className="login-input mt-2 mb-2 rounded-md"
          placeholder="Question"
        />
      </div>
      <div className="mb-1">
        <label htmlFor="video">Related Video</label>
        <select
          name="video"
          id="video"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          required
          className="login-input mt-2 mb-2 rounded-md"
        >
          <option value="">Select video</option>
          {videos?.map((video) => (
            <option key={video.id} value={video.id}>
              {video.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-1">
        <label htmlFor="option-1">Option 1</label>
        <input
          id="option-1"
          name="option-1"
          type="text"
          value={option1.option}
          onChange={(e) =>
            setOption1((prev) => ({ ...prev, option: e.target.value }))
          }
          required
          className={`login-input mt-2 mb-2 rounded-md ${
            option1.isCorrect && "bg-green"
          }`}
          placeholder="1st option"
        />
      </div>
      <div className="mb-1">
        <label htmlFor="option-2">Option 2</label>
        <input
          id="option-2"
          name="option-2"
          type="text"
          required
          value={option2.option}
          onChange={(e) =>
            setOption2((prev) => ({ ...prev, option: e.target.value }))
          }
          className={`login-input mt-2 mb-2 rounded-md ${
            option2.isCorrect && "bg-green"
          }`}
          placeholder="2nd option"
        />
      </div>
      <div className="mb-1">
        <label htmlFor="option-3">Option 3</label>
        <input
          id="option-3"
          name="option-3"
          type="text"
          value={option3.option}
          onChange={(e) =>
            setOption3((prev) => ({ ...prev, option: e.target.value }))
          }
          required
          className={`login-input mt-2 mb-2 rounded-md ${
            option3.isCorrect && "bg-green"
          }`}
          placeholder="3rd option"
        />
      </div>
      <div className="mb-1">
        <label htmlFor="option-4">Option 4</label>
        <input
          id="option-4"
          name="option-4"
          type="text"
          value={option4.option}
          onChange={(e) =>
            setOption4((prev) => ({ ...prev, option: e.target.value }))
          }
          required
          className={`login-input mt-2 mb-2 rounded-md ${
            option4.isCorrect && "bg-green"
          }`}
          placeholder="4th option"
        />
      </div>

      {/* Select correct Options */}

      <p className="mb-1 option-heading">Select Correct Options:</p>
      <div className="rounded-md options-container bg-gray p-4">
        <div className="flex-d-row">
          <label className="flex-label c-pointer" htmlFor="correct-opt1">
            <input
              name="correct-opt1"
              id="correct-opt1"
              type="checkbox"
              className="checkbox-input"
              checked={option1.isCorrect}
              onChange={(e) =>
                setOption1((prev) => ({ ...prev, isCorrect: e.target.checked }))
              }
            />
            <span> Option 1</span>
          </label>

          <label className="flex-label c-pointer" htmlFor="correct-opt2">
            <input
              name="correct-opt2"
              id="correct-opt2"
              type="checkbox"
              className="checkbox-input"
              checked={option2.isCorrect}
              onChange={(e) =>
                setOption2((prev) => ({ ...prev, isCorrect: e.target.checked }))
              }
            />
            <span> Option 2</span>
          </label>

          <label className="flex-label c-pointer" htmlFor="correct-opt3">
            <input
              name="correct-opt3"
              id="correct-opt3"
              type="checkbox"
              className="checkbox-input"
              checked={option3.isCorrect}
              onChange={(e) =>
                setOption3((prev) => ({ ...prev, isCorrect: e.target.checked }))
              }
            />
            <span> Option 3</span>
          </label>

          <label className="flex-label c-pointer" htmlFor="correct-opt4">
            <input
              name="correct-opt4"
              id="correct-opt4"
              type="checkbox"
              className="checkbox-input"
              checked={option4.isCorrect}
              onChange={(e) =>
                setOption4((prev) => ({ ...prev, isCorrect: e.target.checked }))
              }
            />
            <span> Option 4</span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 mt-2 bor2er border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
      >
        {formData?.id ? "Edit Quiz" : "Add Quiz"}
      </button>
    </form>
  );
}
