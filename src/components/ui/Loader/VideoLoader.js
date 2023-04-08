export default function VideoLoader() {
  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <div className="video-loader bg-animate">
        <div className="spinner"></div>
      </div>
      <div className="heading-loader bg-animate"></div>
      <div className="content-loader bg-animate"></div>
    </div>
  );
}
