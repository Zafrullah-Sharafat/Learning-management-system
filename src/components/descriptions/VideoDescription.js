import { useParams } from "react-router-dom";
import { useGetSingleVideoQuery } from "../../features/videos/videoApi";
import { dateGenerator } from "../../utils/dateGenerator";
import VideoError from "../ui/Errors/VideoError";
import VideoLoader from "../ui/Loader/VideoLoader";
import ActionButtons from "./ActionButtons";

export default function VideoDescription() {
  // --------------Dependencies, fetch data from store and api calls
  const { videoId } = useParams();

  const { data: video, isLoading, isError } = useGetSingleVideoQuery(videoId);

  // ------------Decide what to render
  let content = "";
  if (isLoading) {
    content = <VideoLoader />;
  } else if (isError) {
    content = (
      <VideoError message="Video not found! But you can choose another form the right side!" />
    );
  } else {
    content = (
      <div className="col-span-full w-full space-y-8 lg:col-span-2">
        <iframe
          width="100%"
          className="aspect-video"
          src={video.url}
          title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">
            {video.title}
          </h1>
          <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
            Uploaded on {dateGenerator(video.createdAt)}
          </h2>

          <ActionButtons />
          <p className="mt-4 text-sm text-slate-400 leading-6">
            {video.description}
          </p>
        </div>
      </div>
    );
  }
  return content;
}
