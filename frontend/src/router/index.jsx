import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/Main";
import DashboardOverview1 from "../views/dashboard/Main";     
import AddProject from "../views/add-project/Main";
import AddSkill from "../views/add-skill/Main";
import AddCertificate from "../views/add-certificate/Main";
import AddEducation from "../views/add-education/Main";
import ProjectGrid from "../views/project-grid/Main";
import Inbox from "../views/inbox/Main";
import FileManager from "../views/file-manager/Main";
import Chat from "../views/chat/Main";
import Post from "../views/post/Main";
import Calendar from "../views/calendar/Main";
import CertificateGrid from "../views/certificate-grid/Main"; 
import EducationList from "../views/education-list/Main";
import Login from "../views/login/Main";
import ErrorPage from "../views/error-page/Main";
import UpdateProfile from "../views/update-profile/Main";
import ChangePassword from "../views/change-password/Main";
import Notification from "../views/notification/Main";
import SkillList from "../views/skill-list/Main";
import UserHome from "../user/pages/home/Home";

function Router() {
  const routes = [
    {
      path: "/admin",
      element: <SideMenu />,
      children: [
        {
          path: "/admin",
          element: <DashboardOverview1 />,
        },
        {
          path: "add-project",
          element: <AddProject />,
        },
        {
          path: "edit-projects",
          element: <ProjectGrid />,
        },
        {
          path: "add-skill",
          element: <AddSkill />,
        },
        {
          path: "edit-skills",
          element: <SkillList />,
        },
        {
          path: "add-certificate",
          element: <AddCertificate />,
        },
        {
          path: "edit-certificates",
          element: <CertificateGrid />,
        },
        {
          path: "add-education",
          element: <AddEducation />,
        },
        {
          path: "edit-educations",
          element: <EducationList />,
        },
        {
          path: "inbox",
          element: <Inbox />,
        },
        {
          path: "file-manager",
          element: <FileManager />,
        },
        {
          path: "chat",
          element: <Chat />,
        },
        {
          path: "post",
          element: <Post />,
        },
        {
          path: "calendar",
          element: <Calendar />,
        },
        {
          path: "update-profile",
          element: <UpdateProfile />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        {
          path: "notification",
          element: <Notification />,
        },
      ],
    },
    {
      path: "/",
      element: <UserHome />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
