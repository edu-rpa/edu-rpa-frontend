export type Rectangle = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};


export type DataTemplate = {
  [label: string]: Rectangle;
};