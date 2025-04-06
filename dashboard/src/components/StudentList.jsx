export default function StudentList({ students }) {
  return (
    <div className="bg-[#1a1e3a] p-6 rounded-2xl shadow-xl text-white overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#ff7700]">All Students</h2>

      <table className="w-full text-sm text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-[#cbd5e1] uppercase text-xs tracking-wider">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Roll No</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Class</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="bg-[#2c3357] hover:bg-[#373f66] rounded-lg transition-all"
            >
              <td className="px-4 py-3 rounded-l-lg font-medium">
                {student.name}
              </td>
              <td className="px-4 py-3">{student.rollNo}</td>
              <td className="px-4 py-3">{student.admissionYear}</td>
              <td className="px-4 py-3">{student.classType}</td>
              <td className="px-4 py-3 rounded-r-lg">
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    student.status === "Active"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {student.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
