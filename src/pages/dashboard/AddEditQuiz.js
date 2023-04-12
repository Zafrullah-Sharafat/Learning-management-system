import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import QuizForm from "../../components/forms/dashboard/QuizForm";
import { useGetSingleQuizQuery } from "../../features/quizzes/quizzesApi";

export default function AddEditQuiz() {
  // Local States
  const [skip, setSkip] = useState(true);

  // Dependencies
  const { quizId } = useParams();
  const { data } = useGetSingleQuizQuery(quizId, {
    skip,
  });

  // Side Effects
  useEffect(() => {
    if (quizId) {
      setSkip(false);
    }
  }, [quizId]);

  return (
    <>
      <Helmet>
        <title>Manage Quiz</title>
      </Helmet>
      <div className="flex-d-column">
        <h2 className="mt-2 mb-8 text-center text-3xl font-extrabold text-slate-100">
          {data?.id ? "Edit Quiz" : "Add Quiz"}
        </h2>
        <QuizForm formData={data || {}} />
      </div>
    </>
  );
}
