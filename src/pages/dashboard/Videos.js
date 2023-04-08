import { Link } from "react-router-dom";
import VideoTable from "../../components/tables/dashboard/VideoTable";
import DashboardError from "../../components/ui/Errors/DashboardError";
import TableLoader from "../../components/ui/Loader/TableLoader";
import { useGetVideosQuery } from "../../features/videos/videoApi";

export default function Videos() {
  // Fetch all videos form database
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  // Decide what to render
  let content = "";
  if (isLoading) {
    content = <TableLoader />;
  } else if (isError) {
    content = (
      <>
        <div className="w-full flex">
          <Link to="/admin/add-video">
            <button className="btn ml-auto">Add Video</button>
          </Link>
        </div>
        <DashboardError message="Could not fetch videos!" />
      </>
    );
  } else if (videos.length === 0) {
    content = (
      <>
        <div className="w-full flex">
          <Link to="/admin/add-video">
            <button className="btn ml-auto">Add Video</button>
          </Link>
        </div>
        <DashboardError message="No videos found! But you can add one!" />
      </>
    );
  } else {
    content = (
      <>
        <div className="w-full flex">
          <Link to="/admin/add-video">
            <button className="btn ml-auto">Add Video</button>
          </Link>
        </div>
        <VideoTable videos={videos} />
      </>
    );
  }

  return content;
}
