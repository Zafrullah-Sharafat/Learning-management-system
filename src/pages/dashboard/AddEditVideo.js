import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoForm from "../../components/forms/dashboard/VideoForm";
import { useGetSingleVideoQuery } from "../../features/videos/videoApi";

export default function AddEditVideo() {
  // Local States
  const [skip, setSkip] = useState(true);

  // Dependencies
  const { videoId } = useParams();
  const { data } = useGetSingleVideoQuery(videoId, {
    skip,
  });

  // Side Effects
  useEffect(() => {
    if (videoId) {
      setSkip(false);
    }
  }, [videoId, data]);

  return (
    <div className="flex-d-column">
      <h2 className="mt-2 mb-8 text-center text-3xl font-extrabold text-slate-100">
        {data?.id ? "Edit Video" : "Add Video"}
      </h2>
      <VideoForm formData={data || {}} />
    </div>
  );
}
