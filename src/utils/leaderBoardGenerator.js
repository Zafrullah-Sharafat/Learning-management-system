export const leaderBoardGenerator = (
  users = [],
  user = {},
  quizzesArr = [],
  assMarksArr = []
) => {
  //Generate marks
  const generateMarks = (user) => {
    const quizMarks = quizzesArr.filter(
      (quiz) => quiz?.student_id === user?.id
    );
    const assMarks = assMarksArr.filter(
      (assignment) => assignment?.student_id === user?.id
    );
    const quizMarkSum = quizMarks.reduce((a, b) => +a + +b.mark, 0);
    const assMarkSum = assMarks.reduce((a, b) => +a + +b.mark, 0);
    const totalScore = quizMarkSum + assMarkSum;
    return [quizMarkSum, assMarkSum, totalScore];
  };

  // Generating the leaderboard
  const leaderboard = users.map((user) => {
    const [quizMarkSum, assMarkSum, totalScore] = generateMarks(user);
    return {
      id: user.id,
      name: user.name,
      quizMark: quizMarkSum,
      assMark: assMarkSum,
      total: totalScore,
    };
  });

  //Sort leaderboard by total marks
  leaderboard.sort((a, b) => b.total - a.total);

  // Assign rank to users
  let rank = 1;
  leaderboard.forEach((item, i) => {
    if (i > 0 && +item.total < leaderboard[i - 1].total) {
      rank++;
    }
    item.rank = rank;
  });

  // Limit leaderboard to top 20 ranks
  const index = leaderboard.findIndex((user) => user.rank === 21);
  const finalLeaderboard =
    index > 0 ? leaderboard.slice(0, index) : leaderboard;

  // Find user's rank
  const userRankOnBoard = leaderboard.find((entity) => +entity.id === +user.id);

  // Return result
  return [finalLeaderboard, userRankOnBoard];
};
