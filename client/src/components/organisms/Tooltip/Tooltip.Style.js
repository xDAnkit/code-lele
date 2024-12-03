import styled from "styled-components";

export const TooltipContainer = styled.div`
  color: #fff;
  position: absolute;
  right: 100px;
  top: ${({ top }) => (top ? `${top}px` : "0px")};
  background: #37393b;
  padding: 10px 15px;
  font-weight: 600;
  border-radius: 2px;
`;
