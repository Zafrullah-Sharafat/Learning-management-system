import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddVideoMutation,
  useEditVideoMutation,
} from "../../../features/videos/videoApi";

export default function VideoForm({ formData }) {
  //Dependencies
  const [addVideo, { isSuccess }] = useAddVideoMutation();
  const [editVideo, { isSuccess: editSuccess }] = useEditVideoMutation();
  const navigate = useNavigate();

  // Local States
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [views, setViews] = useState("");

  // Side Effects
  useEffect(() => {
    // If video id exist then fillup the form with video data
    if (formData?.id) {
      setTitle(formData.title);
      setUrl(formData.url);
      setDescription(formData.description);
      setDuration(formData.duration);
      setViews(formData.views);
    }
  }, [formData, navigate]);
  useEffect(() => {
    if (isSuccess || editSuccess) {
      navigate("/admin/videos");
    }
  }, [isSuccess, editSuccess, navigate]);
  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const video = {
      title,
      url,
      description,
      duration,
      views,
      createdAt: new Date().toISOString(),
    };

    // If id of video found then edit else add the video
    if (formData?.id) {
      video.id = formData.id;
      editVideo({ id: formData.id, data: video });
    } else {
      addVideo(video);
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
          placeholder="Video Title"
        />
      </div>
      <div className="mb-1">
        <label htmlFor="url" className="sr-only">
          URL
        </label>
        <input
          id="url"
          name="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="login-input rounded-md"
          placeholder="URL"
        />
      </div>
      <div className="mb-1">
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="login-input rounded-md"
          placeholder="Description"
          rows="8"
        ></textarea>
      </div>
      <div className="mb-1">
        <label htmlFor="views" className="sr-only">
          Views
        </label>
        <input
          id="views"
          name="views"
          type="text"
          value={views}
          onChange={(e) => setViews(e.target.value)}
          required
          className="login-input rounded-md"
          placeholder="Total Views"
        />
      </div>
      <div className="mb-1">
        <label htmlFor="duration" className="sr-only">
          Duration
        </label>
        <input
          id="duration"
          name="duration"
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="login-input rounded-md"
          placeholder="Video Duration"
        />
      </div>
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          {formData?.id ? "Edit Video" : "Add Video"}
        </button>
      </div>
    </form>
  );
}
