import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function FacultyTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "All", label: "Show all" },
          {
            value: "Associate Professor",
            label: "Filter by Associate Professor",
          },
          {
            value: "Assistant Professor",
            label: "Filter by Assistant Professor",
          },
          {
            value: "Lecturer",
            label: "Filter by Lecturer",
          },
        ]}
      />
    </TableOperations>
  );
}

export default FacultyTableOperations;
