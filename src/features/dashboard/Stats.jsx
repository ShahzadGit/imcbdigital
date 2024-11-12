/* eslint-disable react/prop-types */
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";

export default function Stats({ studentsapplied, studentsenrolled }) {
  return (
    <>
      <Stat
        title="Total Students Applied"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={studentsapplied}
      />
      <Stat
        title="Total Students Enrolled"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={studentsenrolled}
      />
      <Stat
        title="Present Today"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={120}
      />
      <Stat
        title="Absent Today"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={20}
      />
    </>
  );
}
