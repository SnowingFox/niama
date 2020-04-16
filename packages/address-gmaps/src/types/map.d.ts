// MAP =====================================================================================================================================

export declare class Map {
  constructor (mapDiv: Element | null, opts?: google.maps.MapOptions);
  fitBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void;
  getBounds(): google.maps.LatLngBounds | null | undefined;
  getCenter(): google.maps.LatLng;
  getDiv(): Element;
  getHeading(): number;
  getMapTypeId(): google.maps.MapTypeId;
  getProjection(): google.maps.Projection | null;
  getStreetView(): google.maps.StreetViewPanorama;
  getTilt(): number;
  getZoom(): number;
  panBy(x: number, y: number): void;
  panTo(latLng: google.maps.LatLng | google.maps.LatLngLiteral): void;
  panToBounds(latLngBounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void;
  setCenter(latlng: google.maps.LatLng | google.maps.LatLngLiteral): void;
  setHeading(heading: number): void;
  setMapTypeId(mapTypeId: google.maps.MapTypeId | string): void;
  setOptions(options: google.maps.MapOptions): void;
  setStreetView(panorama: google.maps.StreetViewPanorama): void;
  setTilt(tilt: number): void;
  setZoom(zoom: number): void;
  controls: Array<google.maps.MVCArray<Node>>;
  data: google.maps.Data;
  mapTypes: google.maps.MapTypeRegistry;
  overlayMapTypes: google.maps.MVCArray<google.maps.MapType>;
  setClickableIcons(clickable: boolean): void;
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
