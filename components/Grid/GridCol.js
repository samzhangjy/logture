import React from "react";

export default function GridCol(props) {
  const colSpan = props.colSpan ? props.colSpan : 1;
  return (
    <div
      style={{
        gridColumn: `span ${colSpan} / span ${colSpan}`,
        height: `${props.height ? props.height : "auto"}`,
      }}
    >
      {props.children}
    </div>
  );
}
