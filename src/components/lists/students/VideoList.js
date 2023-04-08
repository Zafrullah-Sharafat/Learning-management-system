import { useParams } from "react-router-dom";
import { useGetVideosQuery } from "../../../features/videos/videoApi";
import VideoListItem from "../../listItems/students/VideoListItem";
import VideosError from "../../ui/Errors/VideosError";
import VideosLoader from "../../ui/Loader/VideosLoader";

export default function VideoList() {
  // Dependencies
  const { videoId } = useParams();

  //Fetch all videos for database
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  // Decide what to render
  let content = "";
  if (isLoading) {
    content = <VideosLoader />;
  } else if (isError) {
    content = <VideosError message="Could not fetch videos!" />;
  } else if (!isLoading && !isError && videos.length === 0) {
    content = <VideosError message="No videos found!" />;
  } else {
    content = (
      <>
        {videos.map((video) => (
          <VideoListItem key={video.id} video={video} activeVideoId={videoId} />
        ))}
      </>
    );
  }

  return (
    <div className="pr-4 border border-slate-50/10 videos-container">
      <div className="video-list-container col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md divide-y divide-slate-600/30">
        {content}
      </div>
    </div>
  );
}
