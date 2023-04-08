// Import components and pages
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import PrivateAdminRoutes from "./components/layouts/PrivateAdminRoutes";
import PrivateUserRoutes from "./components/layouts/PrivateUserRoutes";
import PublicAdminRoutes from "./components/layouts/PublicAdminRoutes";
import PublicUserRoutes from "./components/layouts/PublicUserRoutes";
import UserLayout from "./components/layouts/UserLayout";
import NotFoundError from "./components/ui/Errors/NotFoundError";
import AddEditAssignment from "./pages/dashboard/AddEditAssignment";
import AddEditQuiz from "./pages/dashboard/AddEditQuiz";
import AddEditVideo from "./pages/dashboard/AddEditVideo";
import AdminLogin from "./pages/dashboard/AdminLogin";
import AssignmentMark from "./pages/dashboard/AssignmentMark";
import Assignments from "./pages/dashboard/Assignments";
import Dashboard from "./pages/dashboard/Dashboard";
import Quizzes from "./pages/dashboard/Quizzes";
import Videos from "./pages/dashboard/Videos";
import CoursePlayer from "./pages/studentsPortal/CoursePlayer";
import LeaderBoard from "./pages/studentsPortal/LeaderBoard";
import Quiz from "./pages/studentsPortal/Quiz";
import Registration from "./pages/studentsPortal/Registration";
import StudentLogin from "./pages/studentsPortal/StudentLogin";

// Regester the Public routes and corresponding view elements
export const publicRoutesAndViews = [
  { path: "/", element: <StudentLogin /> },
  { path: "/registration", element: <Registration /> },
  { path: "/admin/login", element: <AdminLogin /> },
];

// Register the Private routes
export const privateRoutesAndViews = [
  { path: "/videoplayer/:videoId", element: <CoursePlayer /> },
  { path: "/quiz/:videoId", element: <Quiz /> },
  { path: "/leaderboard", element: <LeaderBoard /> },
  { path: "/admin", element: <Dashboard /> },
  { path: "/admin/videos", element: <Videos /> },
  { path: "/admin/add-video", element: <AddEditVideo /> },
  { path: "/admin/edit-video/:videoId", element: <AddEditVideo /> },
  { path: "/admin/assignments", element: <Assignments /> },
  { path: "/admin/add-assignment", element: <AddEditAssignment /> },
  { path: "/admin/edit-assignment/:assId", element: <AddEditAssignment /> },
  { path: "/admin/quizzes", element: <Quizzes /> },
  { path: "/admin/add-quiz", element: <AddEditQuiz /> },
  { path: "/admin/edit-quiz/:quizId", element: <AddEditQuiz /> },
  { path: "/admin/assignment-mark", element: <AssignmentMark /> },
  { path: "*", element: <NotFoundError message="Opps! 404 Not Found!" /> },
];

//Render the Views in corresponding views
export const rednerPublicRoutesAndViews = publicRoutesAndViews.map(
  (item, i) => (
    <Route
      key={i}
      path={item.path}
      element={
        item.path.includes("/admin") ? (
          <PublicAdminRoutes>
            <DashboardLayout>{item.element}</DashboardLayout>
          </PublicAdminRoutes>
        ) : (
          <PublicUserRoutes>
            <UserLayout>{item.element}</UserLayout>
          </PublicUserRoutes>
        )
      }
    />
  )
);

//Render the Views in corresponding views
export const rednerPrivateRoutesAndViews = privateRoutesAndViews.map(
  (item, i) => (
    <Route
      key={i}
      path={item.path}
      element={
        item.path.includes("/admin") ? (
          <PrivateAdminRoutes>
            <DashboardLayout>{item.element}</DashboardLayout>
          </PrivateAdminRoutes>
        ) : (
          <PrivateUserRoutes>
            <UserLayout>{item.element}</UserLayout>
          </PrivateUserRoutes>
        )
      }
    />
  )
);
