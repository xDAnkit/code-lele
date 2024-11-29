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
  height: 76px;
`;

export const IncreaseBtn = styled.button`
  background: none;
  color: #fff;
  border: none;
  font-size: 45px;
  border-bottom: 2px solid #6c757d;
  width: 100%;
`;

export const DecreaseBtn = styled.button`
  background: none;
  color: #fff;
  border: none;
  font-size: 55px;
  border-bottom: 2px solid #6c757d;
  width: 100%;
`;

export const ResetBtn = styled.button`
  background: none;
  border: none;
  height: 80px;
  border-bottom: 2px solid #6c757d;
`;

export const DownloadBtn = styled.button`
  background: none;
  height: 80px;
  border: none;
  border-bottom: 2px solid #6c757d;
`;
