import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import QuizTable from "../../components/tables/dashboard/QuizTable";
import DashboardError from "../../components/ui/Errors/DashboardError";
import TableLoader from "../../components/ui/Loader/TableLoader";
import { useGetQuizzesQuery } from "../../features/quizzes/quizzesApi";

export default function Quizzes() {
  // Fetch all quizzes form database
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();

  // Decide what to render
  let content = "";
  if (isLoading) {
    content = <TableLoader />;
  } else if (isError) {
    content = (
      <>
        <div className="w-full flex">
          <Link to="/admin/add-quiz">
            <button className="btn ml-auto">Add Quiz</button>
          </Link>
        </div>
        <DashboardError message="Could not fetch quizzes!" />
      </>
    );
  } else if (quizzes.length === 0) {
    content = (
      <>
        <div className="w-full flex">
          <Link to="/admin/add-quiz">
            <button className="btn ml-auto">Add Quiz</button>
          </Link>
        </div>
        <DashboardError message="No Quizzes Found. But you can add!" />
      </>
    );
  } else {
    content = (
      <>
        <div className="w-full flex">
          <Link to="/admin/add-quiz">
            <button className="btn ml-auto">Add Quiz</button>
          </Link>
        </div>
        <QuizTable quizzes={quizzes} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>All Quizzes</title>
      </Helmet>
      {content}
    </>
  );
}
