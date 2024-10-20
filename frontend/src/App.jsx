import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './context/authContext';
import Home from "./user/pages/home/Home";
import SideMenu from "./layouts/Main";
import DashboardOverview1 from "./views/dashboard/Main";
import AddProject from "./views/add-project/Main";
import AddSkill from "./views/add-skill/Main";
import AddCertificate from "./views/add-certificate/Main";
import AddEducation from "./views/add-education/Main";
import ProjectGrid from "./views/project-grid/Main";
import Inbox from "./views/inbox/Main";
import FileManager from "./views/file-manager/Main";
import Chat from "./views/chat/Main";
import Post from "./views/post/Main";
import Calendar from "./views/calendar/Main";
import CertificateGrid from "./views/certificate-grid/Main";
import EducationList from "./views/education-list/Main";
import Login from "./views/login/Main";
import ErrorPage from "./views/error-page/Main";
import UpdateProfile from "./views/update-profile/Main";
import ChangePassword from "./views/change-password/Main";
import Notification from "./views/notification/Main";
import SkillList from "./views/skill-list/Main";
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component
import { Toaster } from "react-hot-toast";

function App() {
    // Removed the useAuth call here, as we will handle authentication in PrivateRoute
    const { authUser } = useAuth();

    return (
        <>
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />

            {/* Admin Protected Routes */}
            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <SideMenu />
                    </PrivateRoute>
                }
            >
                <Route path="/admin" element={<DashboardOverview1 />} />
                <Route path="add-project" element={<AddProject />} />
                <Route path="projects" element={<ProjectGrid />} />
                <Route path="edit-project/:id" element={<AddProject/>} />
                <Route path="add-skill" element={<AddSkill />} />
                <Route path="skills" element={<SkillList />} />
                <Route path="edit-skill/:id" element={<AddSkill />} />
                <Route path="add-certificate" element={<AddCertificate />} />
                <Route path="certificates" element={<CertificateGrid />} />
                <Route path="edit-certificate/:id" element={<AddCertificate />} />
                <Route path="add-education" element={<AddEducation />} />
                <Route path="educations" element={<EducationList />} />
                <Route path="inbox" element={<Inbox />} />
                <Route path="file-manager" element={<FileManager />} />
                <Route path="chat" element={<Chat />} />
                <Route path="post" element={<Post />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="update-profile" element={<UpdateProfile />} />
                <Route path="change-password" element={<ChangePassword />} />
                <Route path="notification" element={<Notification />} />
            </Route>

            {/* Authentication Routes */}
            <Route
                path="/login"
                element={authUser ? <Navigate to="/admin" /> : <Login />}
            />

            {/* Error Page */}
            <Route path="/error-page" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Toaster
        position="top-right"
        reverseOrder={false} />
        </>
    );
}

export default App;
