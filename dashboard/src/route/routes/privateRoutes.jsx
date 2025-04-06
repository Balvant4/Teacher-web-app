import adminRoutes from "./adminRoutes";
import teacherRoutes from "./teacherRoutes";

const privateRoutes = [...adminRoutes, ...teacherRoutes];

export default privateRoutes;
