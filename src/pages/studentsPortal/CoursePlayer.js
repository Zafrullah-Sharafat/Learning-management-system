import VideoDescription from "../../components/descriptions/VideoDescription";
import VideoList from "../../components/lists/students/VideoList";

export default function CoursePlayer() {
  return (
    <div className="grid grid-cols-3 gap-2 lg:gap-8">
      <VideoDescription />
      <VideoList />
    </div>
  );
}
