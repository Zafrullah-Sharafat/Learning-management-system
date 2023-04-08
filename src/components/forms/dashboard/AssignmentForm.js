import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddAssignmentMutation,
  useEditAssignmentMutation,
} from "../../../features/assignments/assignmentsApi";

export default function AssignmentForm({ formData = {}, videos = [] }) {
  //Dependencies
  const navigate = useNavigate();
  const [addAssignment, { isSuccess }] = useAddAssignmentMutation();
  const [editAssignment, { isSuccess: editSuccess }] =
    useEditAssignmentMutation();

  // Local States
  const [title, setTitle] = useState("");
  const [video_id, setVideoId] = useState("");
  const [totalMark, setTotalMark] = useState("");

  // Side Effects
  useEffect(() => {
    // If assingment id exist then fillup the form with assignment data
    if (formData?.id) {
      setTitle(formData.title);
      setTotalMark(formData.totalMark);
      setVideoId(formData.video_id);
    }
    if (isSuccess || editSuccess) {
      navigate("/admin/assignments");
    }
  }, [formData, navigate, isSuccess, editSuccess]);

  // Form Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const video = videos.find((video) => +video.id === +video_id);
    const video_title = video.title;
    const assignment = {
      title,
      video_id,
      video_title,
      totalMark,
    };

    // If id of assignment found then edit else add the assignment
    if (formData?.id) {
      assignment.id = formData.id;
      editAssignment({ id: formData.id, data: assignment });
    } else {
      addAssignment(assignment);
    }
  };

  return (
    <form className="add-edit-form" onSubmit={handleSubmit}>
      <div className="mb-1">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="login-input rounded-md"
          placeholder="Title"
        />
      </div>
      <div className="mb-1">
        <label htmlFor="video" className="sr-only">
          Related Video
        </label>
        <select
          name="video"
          id="video"
          value={video_id}
          onChange={(e) => setVideoId(e.target.value)}
          className="login-input rounded-md"
        >
          <option value="">
            ----------Select video with no assignment yet!---------
          </option>
          {videos.map((video, index) => (
            <option key={index} value={video.id}>
              {video.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-1">
        <label htmlFor="total-marks" className="sr-only">
          Total Marks
        </label>
        <input
          id="total-marks"
          name="total-marks"
          type="number"
          value={totalMark}
          onChange={(e) => setTotalMark(e.target.value)}
          max="100"
          required
          className="login-input rounded-md"
          placeholder="Total Mark"
        />
      </div>
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          {formData?.id ? "Edit Assignment" : "Add Assignment"}
        </button>
      </div>
    </form>
  );
}
