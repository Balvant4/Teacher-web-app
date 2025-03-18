import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNav } from "../navigation/index";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../store/Reducers/adminAuthReducers";

function Sidebar({ showSidebar, setShowSidebar }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allNav, setAllNav] = useState([]);

  const { role, isAuthenticated } = useSelector((state) => state.adminAuth); // ✅ Get role from Redux

  useEffect(() => {
    const storedRole = localStorage.getItem("role"); // ✅ Ensure consistency
    if (role || storedRole) {
      const navs = getNav(role || storedRole);
      setAllNav(navs);
    } else {
      setAllNav([]); // Reset if no role
    }
  }, [role]); // ✅ Depend on role

  const handleLogout = async () => {
    await dispatch(adminLogout());
    localStorage.removeItem("role"); // ✅ Ensure removal
    navigate("/admin/login"); // ✅ Redirect properly
  };

  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={` fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen top-0 left-0 z-10 bg-[#8cbce780]`}
      ></div>
      <div
        className={`w-[260px] fixed bg-sidnavbg z-50 top-0 h-screen shadow-md transition-all ${
          showSidebar ? " left-0" : " -left-[260px] lg:left-0"
        }`}
      >
        <div className="h-[80px] flex justify-center items-center border-b border-gray-200">
          <Link to="/" className="w-[180px] h-[50px]">
            <img
              className="w-full h-full object-contain"
              src="/images/logo.png"
              alt="logo"
            />
          </Link>
        </div>

        <div className="px-4 py-4">
          <ul>
            {allNav.map((n, i) => (
              <li key={i} className="mb-2">
                <Link
                  to={n.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-md transition-all ${
                    pathname === n.path
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  <span className="text-lg">{n.icon}</span>
                  <span className="font-medium">{n.title}</span>
                </Link>
              </li>
            ))}

            {isAuthenticated ? (
              // If logged in, show the Logout button
              <li>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer flex items-center gap-4 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-all w-full"
                >
                  <span className="text-lg">
                    <RiLogoutBoxLine />
                  </span>
                  <span className="font-medium">Logout</span>
                </button>
              </li>
            ) : (
              // If NOT logged in, show the Login dropdown
              <li>
                <select
                  onChange={(e) => {
                    const selectedRole = e.target.value;
                    if (selectedRole === "admin") {
                      window.location.href = "/admin/login"; // Redirect to Admin Login
                    } else if (selectedRole === "teacher") {
                      window.location.href = "/teacher/login"; // Redirect to Teacher Login
                    }
                  }}
                  className="cursor-pointer flex items-center gap-4 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-all w-full"
                >
                  <option value="" disabled selected>
                    Admin / Teacher
                  </option>
                  <option value="admin">Admin Login</option>
                  <option value="teacher">Teacher Login</option>
                </select>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
