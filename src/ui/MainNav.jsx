import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineAcademicCap,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiMiniUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import { useUser } from "../features/authentication/useUser";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

export default function MainNav() {
  const { user } = useUser();
  const { role } = user.user_metadata;

  return (
    <nav>
      <NavList>
        <li>
          <StyledLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledLink>
        </li>

        {role === "admin" && (
          <>
            <li>
              <StyledLink to="/studentsapplied">
                <HiOutlineAcademicCap />
                <span>Admissions</span>
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/studentsenrolled">
                <HiOutlineHomeModern />
                <span>Enrolled</span>
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/facultydata">
                <HiMiniUsers />
                <span>Faculty</span>
              </StyledLink>
            </li>
          </>
        )}
        {role === "faculty" && (
          <>
            <li>
              <StyledLink to="/account">
                <HiOutlineCog6Tooth />
                <span>Settings</span>
              </StyledLink>
            </li>
          </>
        )}
      </NavList>
    </nav>
  );
}
