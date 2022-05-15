import React from "react";

export default function GridContainer(props) {
  let gridClass = `grid-${props.cols ? props.cols : 1}`;
  if (props.sm) gridClass += `_sm-${props.sm}`;
  if (props.md) gridClass += `_md-${props.md}`;
  if (props.lg) gridClass += `_lg-${props.lg}`;
  if (props.xl) gridClass += `_xl-${props.xl}`;
  return (
    <div className={`${gridClass} ${props.className}`}>
      {props.children}
    </div>
  );
}
