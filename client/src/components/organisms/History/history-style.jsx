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
  /* color: #f44336; */
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

// Modal Component Style Start
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1300;
`;

export const ModalContainer = styled.div`
  background-color: #000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #464646;
  width: 60%;
  animation: ${(props) => (props.isOpen ? fadeIn : fadeOut)} 0.3s ease-out;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1a1a1a;
  padding: 20px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 25px;
  cursor: pointer;
  color: #fff;
  font-weight: 700;
`;

export const TitleStyle = styled.h3`
  color: #fff;
`;
