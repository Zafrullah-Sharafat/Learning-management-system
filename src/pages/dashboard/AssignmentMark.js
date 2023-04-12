import { Helmet } from "react-helmet";
import AssignmentsMarkTable from "../../components/tables/dashboard/AssignmentsMarkTable";
import DashboardError from "../../components/ui/Errors/DashboardError";
import TableLoader from "../../components/ui/Loader/TableLoader";
import { useGetAssMarksQuery } from "../../features/assignmentMarks/assignmentMarksApi";
import { markFilter } from "../../utils/markFilter";

export default function AssignmentMark() {
  // Fetch all submitted assignments form database
  const { data: marks, isLoading, isError } = useGetAssMarksQuery();

  // Calculate the number of assigmnets with corresponding status
  const { total, pending, published } = markFilter(marks);

  // Decide what to render
  let content = "";
  if (isLoading) {
    content = <TableLoader />;
  } else if (isError) {
    content = (
      <DashboardError message="Could not fetch submitted assignments!" />
    );
  } else if (marks.length === 0) {
    content = (
      <DashboardError message="No Assignment submited by students yet!" />
    );
  } else {
    content = (
      <>
        <ul className="assignment-status">
          <li>
            Total <span>{total}</span>
          </li>
          <li>
            Pending <span>{pending}</span>
          </li>
          <li>
            Mark Sent <span>{published}</span>
          </li>
        </ul>
        <AssignmentsMarkTable marks={marks} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Submitted Assignments</title>
      </Helmet>
      {content}
    </>
  );
}
