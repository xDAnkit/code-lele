import { useState } from "react";

const Tooltip = ({ text, children, top }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          style={{
            color: "#fff",
            position: "absolute",
            right: "100px",
            top: top,
            background: "#37393b",
            padding: "10px",
            fontWeight: "600",
            borderRadius: "2px",
            paddingLeft: "15px",
            paddingRight: "15px;",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
