/* eslint-disable react/prop-types */
import { Table } from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import { useGetAllFaculty } from "./useGetAllFaculty";
import FacultyRow from "./FacultyRow";

function FacultyTable() {
  const { isLoading, data } = useGetAllFaculty();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!data.length) return <Empty resourceName="Data" />;

  let filterBy = searchParams.get("sortBy") || "All";

  const filteredData =
    filterBy === "All" ? data : data.filter((a) => a?.designation === filterBy);

  return (
    <Menus>
      <Table columns="0.5fr 2fr 2fr 2fr 2rem">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Designation</div>
          <div>Contact No.</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredData}
          render={(val) => <FacultyRow key={val.id} data={val} />}
        />
        {/*
         <Table.Footer>
          <Pagination count={count} />
        </Table.Footer> */}
      </Table>
    </Menus>
  );
}

export default FacultyTable;
