import { forwardRef } from "react";

const ScrollableMenu = forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        overflow: "auto",
        maxHeight: "400px",
      }}
      className={className}
      aria-labelledby={labeledBy}
    >
      {children}
    </div>
  )
);

export default ScrollableMenu;
