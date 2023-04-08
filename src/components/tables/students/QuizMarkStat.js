import ProgressBar from "../../ui/ProgressBar";

export default function QuizMarkStat({ quizMark = {} }) {
  return (
    <table className="quiz-result-table text-base w-full border border-slate-600/50 rounded-md my-4">
      <tbody>
        <tr className="border-2 border-cyan">
          <td className="table-text table-td text-center font-bold">
            Total Quizzes:
          </td>
          <td className="table-td text-center font-bold">
            {quizMark?.totalQuiz}
          </td>
        </tr>
        <tr className="border-2 border-cyan">
          <td className="table-text table-td text-center font-bold">
            Correct Answer:
          </td>
          <td className="table-td text-center font-bold">
            {quizMark?.totalCorrect}
          </td>
        </tr>
        <tr className="border-2 border-cyan">
          <td className="table-text table-td text-center font-bold">
            Wrong Answer:
          </td>
          <td className="table-td text-center font-bold">
            {quizMark?.totalWrong}
          </td>
        </tr>
        <tr className="border-2 border-cyan">
          <td className="table-text table-td text-center font-bold">
            Your Marks:
          </td>
          <td className="table-td text-center font-bold">{quizMark?.mark}</td>
        </tr>
        <tr className="border-2 border-cyan">
          <td className="table-text table-td text-center font-bold">
            Statistics:
          </td>
          <td className="table-td text-center font-bold">
            <ProgressBar max={quizMark?.totalMark} value={quizMark?.mark} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
