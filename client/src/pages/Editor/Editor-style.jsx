import styled from "styled-components";

export const MainDiv = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

export const SideBarDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  width: 5%;
  background-color: #212529;
`;

export const InnerSidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CopyDiv = styled.div`
  border-bottom: 2px solid #6c757d;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  height: 80px;
`;

export const IconBtn = styled.button`
  background: none;
  border: none;
  height: 100px;
  border-bottom: 2px solid #6c757d;
`;

export const ShowIcon = styled.span`
  font-size: 44px;
  color: #fff;
`;
