import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetAssMarkForUserQuery } from "../../features/assignmentMarks/assignmentMarksApi";
import { useGetAssignmentForVideoQuery } from "../../features/assignments/assignmentsApi";
import { useGetVidoeQuizzesQuery } from "../../features/quizzes/quizzesApi";
import AssignmentModal from "../modals/AssignmentModal";

export default function ActionButtons() {
  // Fetch the current logged-in user
  const user = useSelector((state) => state.auth.user);

  //---------------Local States
  const [modal, setModal] = useState(false);
  const [skipFetchAssMark, setSkipFetchAssMark] = useState(true);
  const [assignmentId, setAssignmentId] = useState("");
  const [submittedAss, setSubmittedAss] = useState({});

  // Fetch data's from api call
  const { videoId } = useParams();
  const { data: assignment } = useGetAssignmentForVideoQuery(videoId);
  const { data: quizzes } = useGetVidoeQuizzesQuery(videoId);
  const { data: assignmentMark, isSuccess: isSuccessFchAssMark } =
    useGetAssMarkForUserQuery(
      {
        userId: user?.id,
        assId: assignmentId,
      },
      { skip: skipFetchAssMark }
    );

  useEffect(() => {
    if (isSuccessFchAssMark && assignmentMark.length > 0) {
      setSubmittedAss(assignmentMark[0]);
    } else {
      setSubmittedAss({});
    }
    if (assignment && assignment.length > 0 && assignment[0]?.id) {
      setAssignmentId(assignment[0]?.id);
      setSkipFetchAssMark(false);
    }
  }, [assignment, assignmentMark, isSuccessFchAssMark]);

  return (
    <>
      {modal && (
        <AssignmentModal
          modalHandler={setModal}
          user={user}
          assignment={assignment && assignment.length > 0 ? assignment[0] : {}}
          submittedAssignment={submittedAss}
          setSubmittedAss={setSubmittedAss}
        />
      )}
      <div className="flex gap-4">
        {assignment && assignment.length > 0 && (
          <button
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            onClick={() => setModal(true)}
          >
            {submittedAss?.id ? "যা জমা দিয়েছেন" : "এসাইনমেন্ট"}
          </button>
        )}
        {quizzes && quizzes.length > 0 && (
          <Link
            to={`/quiz/${videoId}`}
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            কুইজে অংশগ্রহণ করুন
          </Link>
        )}
      </div>
    </>
  );
}
