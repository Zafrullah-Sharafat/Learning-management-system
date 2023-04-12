import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import LeaderBoardTable from "../../components/tables/students/LeaderBoardTable";
import SelfRankTable from "../../components/tables/students/SelfRankTable";
import NotFoundError from "../../components/ui/Errors/NotFoundError";
import LeaderBoardLoader from "../../components/ui/Loader/LeaderBoardLoader";
import { useGetAssMarksQuery } from "../../features/assignmentMarks/assignmentMarksApi";
import { useGetQuizMarkQuery } from "../../features/quizMark/quizMarkApi";
import { useGetStudentsQuery } from "../../features/users/usersApi";
import { leaderBoardGenerator } from "../../utils/leaderBoardGenerator";

export default function LeaderBoard() {
  // Fetch all users form database
  const { data: users } = useGetStudentsQuery();

  // Fetch data of current loggne-in user
  const user = useSelector((state) => state.auth.user);

  // Fetch marks of all Quizzes
  const {
    data: quizMark,
    isLoading: quizLoading,
    isError: quizError,
  } = useGetQuizMarkQuery();

  // Fetch marks of all Assignments
  const {
    data: assignmentMark,
    isLoading: assLoading,
    isError: assError,
  } = useGetAssMarksQuery();

  // Generate leaderboard
  const [finalLeaderboard, userRankOnBoard] = leaderBoardGenerator(
    users,
    user,
    quizMark,
    assignmentMark
  );

  // Decide what to render
  let content = "";
  if (quizLoading || assLoading) {
    content = <LeaderBoardLoader />;
  } else if (quizError || assError) {
    content = (
      <NotFoundError message="Something wrong! Can not fetch Leaderboard!" />
    );
  } else {
    content = (
      <>
        <Helmet>
          <title>LeaderBoard</title>
        </Helmet>
        <SelfRankTable data={userRankOnBoard} />
        <LeaderBoardTable leaders={finalLeaderboard} userId={user?.id} />
      </>
    );
  }
  return content;
}
