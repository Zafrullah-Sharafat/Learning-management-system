export default function VideosLoader() {
  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <div className="videos-loader">
        <div className="skeleton">
          <div className="skeleton-item bg-animate"></div>
          <div className="skeleton-item bg-animate"></div>
          <div className="skeleton-item bg-animate"></div>
          <div className="skeleton-item bg-animate"></div>
        </div>
      </div>
    </div>
  );
}
