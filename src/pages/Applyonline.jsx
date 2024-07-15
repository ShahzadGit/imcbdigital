// import { useState } from "react";
// import CabinTable from "../features/cabins/CabinTable";
// import Heading from "../ui/Heading";
// import Row from "../ui/Row";
// import Button from "../ui/Button";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";
import CreateAddmissionForm from "../features/apply-online/CreateAddmissionForm";
// import AddCabin from "../features/cabins/AddCabin";
// import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Applyonline() {
  // useEffect(function () {
  //   getCabins().then((data) => console.log(data));
  // }, []);
  // const [showCabinForm, setShowCabinForm] = useState(false);
  return (
    <>
      {/* <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row> */}
      {/* <Row>
        <CabinTable />
      </Row> */}
      <CreateAddmissionForm />
      {/* <Button type="primary" onClick={() => setShowCabinForm((show) => !show)}>
        Add a Cabin
      </Button>
      {showCabinForm && <CreateCabinForm />} */}
    </>
  );
}

export default Applyonline;
