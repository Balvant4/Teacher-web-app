import AdminPageCards from "./AdminPageCards"; // Adjust the path if needed
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserGraduate,
} from "react-icons/fa";

export default function StudentStats({ students }) {
  const total = students.length;
  const active = students.filter((s) => s.status === "Active").length;
  const passedOut = students.filter((s) => s.status === "Passed Out").length;
  const inactive = students.filter((s) => s.status === "Inactive").length;

  const byClass = students.reduce((acc, student) => {
    acc[student.classType] = (acc[student.classType] || 0) + 1;
    return acc;
  }, {});

  const byYear = students.reduce((acc, student) => {
    acc[student.admissionYear] = (acc[student.admissionYear] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-[#222b45] p-4 rounded-xl text-white shadow mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-[#ff7700]">
        📊 Student Statistics
      </h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        <AdminPageCards
          value={total}
          label="Total Students"
          batch="📊 Overview"
          bgColor="bg-[#3742fa]"
          iconBgColor="bg-[#273c75]"
          logo={FaUsers}
        />
        <AdminPageCards
          value={active}
          label="Active Students"
          batch="🎓 Current"
          bgColor="bg-[#2ed573]"
          iconBgColor="bg-[#20bf6b]"
          logo={FaUserCheck}
        />
        <AdminPageCards
          value={inactive}
          label="Inactive Students"
          batch="⏸️ Dropped"
          bgColor="bg-[#ffa502]"
          iconBgColor="bg-[#e1b12c]"
          logo={FaUserTimes}
        />
        <AdminPageCards
          value={passedOut}
          label="Passed Out Students"
          batch="🎓 Alumni"
          bgColor="bg-[#57606f]"
          iconBgColor="bg-[#2f3640]"
          logo={FaUserGraduate}
        />
      </div>
      <hr />
      {/* Class & Year wise sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-300">
            📚 Class-wise Count
          </h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-400">
            {Object.entries(byClass).map(([className, count]) => (
              <li key={className}>
                <span className="font-medium text-white">{className}:</span>{" "}
                {count}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-300">
            📅 Year-wise Count
          </h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-400">
            {Object.entries(byYear).map(([year, count]) => (
              <li key={year}>
                <span className="font-medium text-white">{year}:</span> {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
