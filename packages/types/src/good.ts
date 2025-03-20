export interface IGoodMapData {
  label: string;
  value: string;
}

export type IGoodMapDataList = IGoodMapData[];

export interface IGood {
  id: number;
  name: string;
  price: number;
  salesVolume?: number;
  img?: string;
  swiperList?: string[];
  mapData?: IGoodMapData[];
  detailImgs?: string[];
}

export interface ICategory {
  id: number;
  name: string;
  img?: string;
}
