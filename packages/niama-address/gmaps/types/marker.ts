import { Map } from './map';

// MARKER ==================================================================================================================================

export declare class Marker {
  constructor (opts?: google.maps.ReadonlyMarkerOptions);
  getAnimation(): Animation | null | undefined;
  getClickable(): boolean;
  getCursor(): string | null | undefined;
  getDraggable(): boolean | null | undefined;
  getIcon(): string | google.maps.ReadonlyIcon | google.maps.ReadonlySymbol | null | undefined;
  getLabel(): google.maps.ReadonlyMarkerLabel | null | undefined;
  getMap(): Map | google.maps.StreetViewPanorama | null | undefined;
  getOpacity(): number | null | undefined;
  getPosition(): google.maps.LatLng | null | undefined;
  getShape(): google.maps.MarkerShape | null | undefined;
  getTitle(): string | null | undefined;
  getVisible(): boolean;
  getZIndex(): number | null | undefined;
  setAnimation(animation: Animation | null): void;
  setClickable(flag: boolean): void;
  setCursor(cursor: string | null): void;
  setDraggable(flag: boolean | null): void;
  setIcon(icon: string | google.maps.ReadonlyIcon | google.maps.ReadonlySymbol | null): void;
  setLabel(label: string | google.maps.ReadonlyMarkerLabel | null): void;
  setMap(map: Map | google.maps.StreetViewPanorama | null): void;
  setOpacity(opacity: number | null): void;
  setOptions(options: google.maps.ReadonlyMarkerOptions): void;
  setPosition(latlng: google.maps.LatLng | google.maps.ReadonlyLatLngLiteral | null): void;
  setShape(shape: google.maps.MarkerShape | null): void;
  setTitle(title: string | null): void;
  setVisible(visible: boolean): void;
  setZIndex(zIndex: number | null): void;
  addListener(eventName: google.maps.MarkerChangeOptionEventNames, handler: (this: Marker) => void): google.maps.MapsEventListener;
  addListener(
    eventName: google.maps.MarkerMouseEventNames,
    handler: (this: Marker, event: MouseEvent) => void
  ): google.maps.MapsEventListener;
  /** @deprecated */
  addListener(eventName: string, handler: (this: Marker, ...args: any[]) => void): google.maps.MapsEventListener;
}
