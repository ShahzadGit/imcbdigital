import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 2.5rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    
    ${(props) =>
    props.type === "h4" &&
    css`
      font-size: 2.5rem;
      font-weight: 600;
      text-align: center;
    `}
    line-height: 1;

  @media only screen and (max-width: 576px) {
    ${(props) =>
      props.type === "h1" &&
      css`
        font-size: 2.5rem;
        font-weight: 600;
      `}
    ${(props) =>
      props.type === "h2" &&
      css`
        font-size: 2rem;
        font-weight: 600;
      `}

    ${(props) =>
      props.type === "h3" &&
      css`
        font-size: 1.2rem;
        font-weight: 500;
        padding-top: 1rem;
      `}
    
    ${(props) =>
      props.type === "h4" &&
      css`
        font-size: 2.5rem;
        font-weight: 600;
        text-align: center;
      `}
    line-height: 1;
  }
`;

export default Heading;
