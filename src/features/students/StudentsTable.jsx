/* eslint-disable react/prop-types */
import { Table } from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
// import Pagination from "../../ui/Pagination";
// import { useGetStudentsAndCourses } from "./useGetStudentsAndCourses";
import StdCourseRow from "./StdCourseRow";
import { useSearchParams } from "react-router-dom";
import { useGetStudentsEnrolled } from "./useGetStudentsEnrolled";

function StudentsTable() {
  const { isLoading, data } = useGetStudentsEnrolled();
  const [searchParams] = useSearchParams();
  // console.log("StudentsEnrolled--->", data);
  // console.log("Count--->", count);
  if (isLoading) return <Spinner />;
  if (!data.length) return <Empty resourceName="Data" />;

  let filterBy = searchParams.get("sortBy") || "All";
  // console.log("🚀 ~ StudentsTable ~ filterBy:", filterBy);

  const filteredData =
    filterBy === "All" ? data : data.filter((a) => a?.group === filterBy);
  // console.log("🚀 ~ StudentsTable ~ filteredData:", filteredData);

  return (
    <Menus>
      <Table columns="0.5fr 1.5fr 2fr 2fr 2fr 2rem">
        <Table.Header>
          <div></div>
          <div>Roll #</div>
          <div>Name</div>
          <div>Class</div>
          <div>Group</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredData}
          render={(val) => <StdCourseRow key={val.id} data={val} />}
        />
        {/*
         <Table.Footer>
          <Pagination count={count} />
        </Table.Footer> */}
      </Table>
    </Menus>
  );
}

export default StudentsTable;
