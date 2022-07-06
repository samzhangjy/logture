import { FC } from "react";

export interface GridContainerProps {
  cols: number;
  className?: string;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  children?: React.ReactNode;
  gap?: number | string;
}

const GridContainer: FC<GridContainerProps> = (props) => {
  let gridClass = `grid-${props.cols ? props.cols : 1}`;
  if (props.sm) gridClass += `_sm-${props.sm}`;
  if (props.md) gridClass += `_md-${props.md}`;
  if (props.lg) gridClass += `_lg-${props.lg}`;
  if (props.xl) gridClass += `_xl-${props.xl}`;
  return (
    <div className={`${gridClass} ${props.className}`}>{props.children}</div>
  );
};

export default GridContainer;
