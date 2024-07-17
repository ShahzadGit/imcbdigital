import styled from "styled-components";
import Logo from "./Logo";
// import MainNav from "./MainNav";
// import Uploader from "../data/Uploader";

const StyledSideBar = styled.aside`
  background-color: var(--color-grey-0);
  /* grid-row: 2 / -1; */
  grid-row: 1 / -1;
  border-right: 1px solid var(--color-grey-100);
  padding: 2.5rem;

  @media only screen and (max-width: 576px) {
    display: none;
  }
`;
export default function SideBar() {
  return (
    <StyledSideBar>
      <Logo />
      {/* <MainNav /> */}
      {/* <Uploader /> */}
    </StyledSideBar>
  );
}
