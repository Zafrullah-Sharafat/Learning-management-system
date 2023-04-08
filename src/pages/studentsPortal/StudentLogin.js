import { Link } from "react-router-dom";
import StudentLoginForm from "../../components/forms/students/StudentLoginForm";

export default function StudentLogin() {
  return (
    <>
      <section className="bg-primary login-container grid place-items-center">
        <div className="mx-auto max-w-md lg:px-0">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Sign in to Student Account
            </h2>
          </div>
          <StudentLoginForm />
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/registration"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Don't Have Account? Create New Account Here!
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
