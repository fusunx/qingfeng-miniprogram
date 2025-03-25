import type { IGoodDetail } from "./common";

export interface IGoodMapData {
  label: string;
  value: string;
}

export type IGoodMapDataList = IGoodMapData[];

export interface IGood extends IGoodDetail {}

export interface ICategory {
  id: number;
  name: string;
  img?: string;
}
