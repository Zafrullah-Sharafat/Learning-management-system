import { useState } from "react";
import { useProvideAssignmentMarkMutation } from "../../../features/assignmentMarks/assignmentMarksApi";
import { dateGenerator } from "../../../utils/dateGenerator";

export default function AssignmentMarkRow({ data }) {
  // Dependencies and Props
  const [addAssignmentMark] = useProvideAssignmentMarkMutation();
  const {
    id,
    student_name,
    title,
    createdAt,
    mark: exactMark,
    repo_link,
    status,
    totalMark,
  } = data || {};

  // Local states
  const [mark, setMark] = useState(totalMark);

  // Marking student's assignments functionalities
  const addMark = (e) => {
    e.preventDefault();
    const markObj = { ...data, status: "published", mark: +mark };
    addAssignmentMark({ id, data: markObj });
  };

  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">{`${dateGenerator(createdAt)}   ${new Date(
        createdAt
      ).toLocaleTimeString()}`}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>
      {status === "published" ? (
        <td className="table-td">{exactMark}</td>
      ) : (
        <td className="table-td input-mark">
          <form onSubmit={addMark}>
            <input
              max={totalMark}
              value={mark}
              type="number"
              onChange={(e) => setMark(e.target.value)}
            />
            <button type="submit">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>
          </form>
        </td>
      )}
    </tr>
  );
}
