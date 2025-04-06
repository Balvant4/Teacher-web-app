import { useState } from "react";
import StudentStats from "../../components/StudentStats";
import StudentList from "../../components/StudentList";
import initialStudents from "../../data/initialStudents";

function TeacherDashboard() {
  const [students, setStudents] = useState(initialStudents);

  return (
    <div className="min-h-screen p-6 bg-[#101426] text-white">
      <div>
        {/* Stats Card */}
        <div className="bg-[#222b45] rounded-xl p-2 mb-6 shadow-md">
          <StudentStats students={students} />
        </div>

        {/* List Card */}
        <div className="bg-[#222b45] rounded-xl p-2 mb-6 shadow-md">
          <StudentList students={students} />
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
