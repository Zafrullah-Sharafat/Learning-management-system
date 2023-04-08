export const quizMarkCalculator = (quizzes = []) => {
  const totalQuiz = quizzes.length;
  const totalMark = quizzes.length * 5;

  let mark = 0;
  let totalCorrect = totalQuiz;
  let totalWrong = 0;

  quizzes.forEach((quiz) => {
    let quizMark = 5;
    let wrong = 0;
    quiz.options.forEach((option) => {
      if (option.isCorrect !== option.isMarked) {
        quizMark = 0;
        wrong = 1;
      }
    });
    mark += quizMark;
    totalCorrect -= wrong;
    totalWrong += wrong;
  });
  return { totalQuiz, totalMark, mark, totalCorrect, totalWrong };
};
