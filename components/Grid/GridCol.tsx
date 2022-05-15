import React from "react";

export default function GridCol(props) {
  let colSpan = `col-${props.colSpan ? props.colSpan : 1}`;
  if (props.sm) colSpan += `_sm-${props.sm}`;
  if (props.md) colSpan += `_md-${props.md}`;
  if (props.lg) colSpan += `_lg-${props.lg}`;
  if (props.xl) colSpan += `_xl-${props.xl}`;
  return (
    <div
      className={`${colSpan} ${props.className}`}
    >
      {props.children}
    </div>
  );
}
