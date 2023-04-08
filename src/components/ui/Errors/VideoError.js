export default function VideoError({ message }) {
  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <div className="video-loader bg-error">
        <h2 className="error-message color-animate">{message}</h2>
      </div>
    </div>
  );
}
