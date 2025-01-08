import { Button, Dialog, DialogTitle } from "@mui/material";
import styled, { keyframes } from "styled-components";
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

export const CardLink = styled.a`
  text-decoration: none;
  color: #fff;
  margin-top: 10px;
`;

export const Card = styled.div`
  position: relative;
  padding: 15px;
  border: 1px solid #676666;
  border-radius: 8px;
  background-color: #121212;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: none;

  ${Card}:hover & {
    display: block;
    color: #fff;
  }
`;

export const Title = styled.h3`
  font-size: 18px;
  margin: 0 0 10px;
  color: #cfcfcf;
`;

export const Language = styled.p`
  font-size: 14px;
  color: #cfcfcf;
  font-weight: 600;
`;

export const CreatedBy = styled.p`
  font-size: 14px;
  color: #cfcfcf;
  font-weight: 600;
`;

export const Timestamp = styled.span`
  font-size: 14px;
  color: #cfcfcf;
  font-weight: 600;
  display: block;
  margin-bottom: 15px;
`;

export const DialogHeading = styled(DialogTitle)`
  color: #fff;
`;

export const DialogActionButtons = styled(Button)`
  color: #fff;
`;

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    background: #222;
  }
`;
