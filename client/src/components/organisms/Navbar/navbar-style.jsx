import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkTag = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
`;

export const TitleInput = styled.input`
  background-color: #262626;
  border: none;
  width: 130px;
  padding-left: 10px;
  font-weight: 700;
  border-radius: 5px;
`;

export const HistoryButton = styled.button`
  background: none;
  border: none;
  font-weight: 700;
`;
