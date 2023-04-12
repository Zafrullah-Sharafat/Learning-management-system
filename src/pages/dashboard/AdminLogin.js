import { Helmet } from "react-helmet";
import AdminLoginForm from "../../components/forms/dashboard/AdminLoginForm";

export default function AdminLogin() {
  return (
    <>
      <Helmet>
        <title>Admin Login</title>
      </Helmet>
      <section className="bg-primary admin-login-container grid place-items-center">
        <div className="mx-auto max-w-md lg:px-0">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Sign in to Admin Account
            </h2>
          </div>
          <AdminLoginForm />
        </div>
      </section>
    </>
  );
}
