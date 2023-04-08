export default function QuizzesLoader() {
  return (
    <>
      <div className="mb-8">
        <div className="skeleton">
          <div className="skeleton-item-sm skeleton-item bg-animate"></div>
          <div className="skeleton-item-ex-sm skeleton-item bg-animate"></div>
        </div>
      </div>
      <div className="space-y-8">
        <div className="quiz">
          <div className="skeleton-item-ex-sm skeleton-item bg-animate"></div>
          <div className="skeleton-grid">
            <div className="skeleton-item mr-2 bg-animate"></div>
            <div className="skeleton-item ml-1 bg-animate"></div>
            <div className="skeleton-item mr-2 bg-animate"></div>
            <div className="skeleton-item ml-1 bg-animate"></div>
          </div>
        </div>
      </div>
      <div className="skeleton">
        <div className="skeleton-item skeleton-button bg-animate"></div>
      </div>
    </>
  );
}
