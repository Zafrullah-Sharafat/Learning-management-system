export function transformQuizOptions(quizzes = []) {
  const transformQuizzes = quizzes.map((quiz) => {
    let transformOptions = quiz?.options.map((option) => {
      return { ...option, isMarked: false };
    });
    return {
      ...quiz,
      options: transformOptions,
    };
  });
  return transformQuizzes;
  // const correctOption = {};
  // quizzes.forEach((quiz) => {
  //   quiz?.options.forEach((option) => {
  //     if (option.isCorrect) {
  //       if (correctOption[quiz?.id]) {
  //         correctOption[quiz?.id].push(option?.id);
  //       } else {
  //         correctOption[quiz?.id] = [option?.id];
  //       }
  //     }
  //   });
  // });
  // return correctOption;
}
