import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function StdTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "All", label: "Show all" },
          { value: "Humanities", label: "Filter by Humanities" },
          { value: "Pre-Engineering", label: "Filter by Pre-Engineering" },
          {
            value: "Pre-Medical",
            label: "Filter by Pre-Medical",
          },
          { value: "General Science", label: "Filter by General Science" },
          { value: "ICS", label: "Filter by ICS" },
          { value: "I.Com", label: "Filter by I.Com" },
        ]}
      />
    </TableOperations>
  );
}

export default StdTableOperations;
