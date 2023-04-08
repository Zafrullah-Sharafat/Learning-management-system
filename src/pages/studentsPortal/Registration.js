import { Link } from "react-router-dom";
import image from "../../assets/image/learningportal.svg";
import StudentRegistrationForm from "../../components/forms/students/StudentRegistrationForm";

export default function Registration() {
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={image} alt="Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>
        </div>
        <StudentRegistrationForm />
        <div className="flex items-center justify-end">
          <div className="text-sm">
            <Link
              to="/"
              className="font-medium text-violet-600 hover:text-violet-500"
            >
              Already Have Account? Login Here!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
