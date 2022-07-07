import { FC } from "react";

export interface GridColProps {
  colSpan: number;
  className?: string;
  children?: React.ReactNode;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const GridCol: FC<GridColProps> = (props) => {
  let colSpan = `col-${props.colSpan ? props.colSpan : 1}`;
  if (props.sm) colSpan += `_sm-${props.sm}`;
  if (props.md) colSpan += `_md-${props.md}`;
  if (props.lg) colSpan += `_lg-${props.lg}`;
  if (props.xl) colSpan += `_xl-${props.xl}`;
  return (
    <div className={`${colSpan} ${props.className}`}>{props.children}</div>
  );
};

export default GridCol;
