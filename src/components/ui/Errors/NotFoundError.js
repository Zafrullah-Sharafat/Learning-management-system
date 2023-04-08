export default function NotFoundError({ message }) {
  return (
    <div className="not-found">
      <h2 className="not-found-message color-animate">{message}</h2>
    </div>
  );
}
