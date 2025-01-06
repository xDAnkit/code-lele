import React, { useEffect } from "react";
import { Portal } from "react-portal";

import {
  CloseButton,
  Header,
  ModalContainer,
  Overlay,
  TitleStyle,
} from "../../organisms/History/history-style";

const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <Overlay onClick={onClose}>
        <ModalContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
          <Header className="ndview">
            <TitleStyle>{title}</TitleStyle>
            <CloseButton onClick={onClose}>✕</CloseButton>
          </Header>
          {children}
        </ModalContainer>
      </Overlay>
    </Portal>
  );
};

export default Modal;
