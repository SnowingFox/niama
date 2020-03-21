import { Map } from './map';

// INFO ====================================================================================================================================

export declare class InfoWindow {
  constructor(opts?: google.maps.InfoWindowOptions);
  close(): void;
  getContent(): string | Element;
  getPosition(): google.maps.LatLng;
  getZIndex(): number;
  open(map?: Map | google.maps.StreetViewPanorama, anchor?: google.maps.MVCObject): void;
  setContent(content: string | Node): void;
  setOptions(options: google.maps.InfoWindowOptions): void;
  setPosition(position: google.maps.LatLng | google.maps.LatLngLiteral): void;
  setZIndex(zIndex: number): void;
  addListener(eventName: string, handler: (...args: any[]) => void): google.maps.MapsEventListener;
  bindTo(key: string, target: google.maps.MVCObject, targetKey?: string, noNotify?: boolean): void;
  changed(key: string): void;
  get(key: string): any;
  notify(key: string): void;
  set(key: string, value: any): void;
  setValues(values: any): void;
  unbind(key: string): void;
  unbindAll(): void;
}