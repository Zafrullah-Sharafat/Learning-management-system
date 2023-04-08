import { useEffect, useState } from "react";
import { useAddAssignmentForMarkMutation } from "../../features/assignmentMarks/assignmentMarksApi";
import ProgressBar from "../ui/ProgressBar";

export default function AssignmentModal({
  modalHandler,
  assignment = [],
  user = {},
  submittedAssignment = {},
  setSubmittedAss,
}) {
  // Dependencies
  const [addAssignmentForMark, { data: assignmemtMark, isSuccess }] =
    useAddAssignmentForMarkMutation();

  // Local States
  const [repoLink, setRepoLink] = useState("");

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      student_id: user?.id,
      student_name: user?.name,
      assignment_id: assignment?.id,
      title: assignment?.title,
      createdAt: new Date().toISOString(),
      totalMark: assignment?.totalMark,
      mark: 0,
      repo_link: repoLink,
      status: "pending",
    };

    // Add new Assignment
    addAssignmentForMark(data);
  };

  // Side Effects
  useEffect(() => {
    if (submittedAssignment?.id) {
      setRepoLink(submittedAssignment?.repo_link);
    }
    if (isSuccess) {
      setSubmittedAss(assignmemtMark);
      modalHandler(false);
    }
  }, [
    isSuccess,
    modalHandler,
    assignmemtMark,
    setSubmittedAss,
    submittedAssignment,
  ]);

  return (
    <div className="modal-container">
      <div className="assignment-modal">
        <div className="modal-header">
          <span></span>
          <h2 className="text-center text-3xl font-extrabold text-slate-100">
            {!submittedAssignment?.id
              ? "Submit Assignment"
              : "Submitted Assignment"}
          </h2>

          <button onClick={() => modalHandler(false)}>
            <svg
              viewBox="0 0 100 100"
              className="close-modal-btn"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="10"
                y1="10"
                x2="90"
                y2="90"
                stroke="white"
                strokeWidth="10"
              />
              <line
                x1="90"
                y1="10"
                x2="10"
                y2="90"
                stroke="white"
                strokeWidth="10"
              />
            </svg>
          </button>
        </div>

        {/* If assignment is submitted already */}
        {submittedAssignment?.id && (
          <div className="mt-8 mb-2 assignment-input">
            {submittedAssignment?.status === "pending" ? (
              <>
                <h2 style={{ fontSize: "17px" }}>Mark Status:</h2>
                <p className="mt-2">
                  An Instructor will check your assignment and you will see the
                  mark here!
                </p>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: "17px" }}>Your Mark:</h2>
                <ProgressBar
                  value={+submittedAssignment?.mark}
                  max={submittedAssignment?.totalMark}
                />
              </>
            )}
          </div>
        )}

        <form
          className="mt-8 space-y-6"
          onSubmit={!submittedAssignment?.id ? handleSubmit : undefined}
        >
          <div className="rounded shadow-sm -space-y-px">
            <div className="assignment-input">
              <label htmlFor="assignment-title">Assignment Title:</label>
              <input
                id="assignment-title"
                disabled
                value={assignment?.title}
                className="login-input rounded-md"
              />
            </div>
          </div>
          <div className="rounded shadow-sm -space-y-px">
            <div className="assignment-input">
              <label htmlFor="assignment-url">Repository Link:</label>
              <input
                id="assignment-url"
                name="assignment-url"
                type="url"
                required
                value={repoLink}
                disabled={Boolean(submittedAssignment?.id)}
                onChange={(e) => setRepoLink(e.target.value)}
                className="login-input rounded-md"
                placeholder="Github repo link"
              />
            </div>
          </div>
          {!submittedAssignment?.id && (
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
