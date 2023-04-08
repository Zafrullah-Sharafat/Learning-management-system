export default function DashboardError({ message }) {
  return (
    <div className="dahsboard-error not-found mt-8">
      <h2 className="not-found-message color-animate">{message}</h2>
    </div>
  );
}
