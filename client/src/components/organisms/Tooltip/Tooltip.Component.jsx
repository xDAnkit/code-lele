import { useState } from "react";
import { TooltipContainer } from "./Tooltip.Style";

const TooltipView = ({ text, children, top }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {isVisible && <TooltipContainer top={top}>{text}</TooltipContainer>}
    </div>
  );
};

export default TooltipView;
