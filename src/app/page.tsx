import ClockMain from "@/components/Clock-Main";
import { getEmployees, getTimeLogs } from "@/lib/util/server";

const Home = async () => {
  const employees = await getEmployees();
  const timeLogs = await getTimeLogs();

  if (!employees || employees.length === 0) {
    return <div>No employees found</div>;
  }

  if (!timeLogs || timeLogs.length === 0) {
    return <div>No time logs found</div>;
  }

  console.log(employees);
  console.log(timeLogs);

  return (
    <div className="flex min-h-screen">
      <ClockMain employees={employees} timeLogs={timeLogs} />
    </div>
  );
};

export default Home;
