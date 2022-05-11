import React from "react";

export default function GridContainer(props) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${props.cols}, minmax(0, 1fr))`,
      columnGap: props.gap ? props.gap : "0px",
      rowGap: props.rowGap ? props.rowGap : "10px"
    }}
    >
      {props.children}
    </div>
  )
}
