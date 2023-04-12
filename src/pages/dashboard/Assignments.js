import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import AssignmentsTable from "../../components/tables/dashboard/AssignmentsTable";
import DashboardError from "../../components/ui/Errors/DashboardError";
import TableLoader from "../../components/ui/Loader/TableLoader";
import { useGetAssignmentsQuery } from "../../features/assignments/assignmentsApi";

export default function Assignments() {
  // Fetch all assignment form database
  const { data: assignments, isLoading, isError } = useGetAssignmentsQuery();

  // Decide what to render
  let content = "";
  if (isLoading) {
    content = <TableLoader />;
  } else if (isError) {
    content = (
      <>
        <div className="w-full flex">
          <Link to="/admin/add-assignment">
            <button className="btn ml-auto">Add Assignment</button>
          </Link>
        </div>
        <DashboardError message="Could not fetch assignments!" />
      </>
    );
  } else if (assignments.length === 0) {
    content = (
      <>
        <div className="w-full flex">
          <Link to="/admin/add-assignment">
            <button className="btn ml-auto">Add Assignment</button>
          </Link>
        </div>
        <DashboardError message="No Assingments Found. But you can add!" />
      </>
    );
  } else {
    content = (
      <>
        <div className="w-full flex">
          <Link to="/admin/add-assignment">
            <button className="btn ml-auto">Add Assignment</button>
          </Link>
        </div>
        <AssignmentsTable assignments={assignments} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>All Assignments</title>
      </Helmet>
      {content}
    </>
  );
}
