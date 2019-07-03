import * as C from './core';
import * as E from './externals';

type AlignmentCommon = CSSWideKeyword | 'end' | 'first baseline' | 'last baseline' | 'safe center' | 'start' | 'unsafe center';
type AlignmentCommonNative = 'center' | 'flex-end' | 'flex-start';

export type AlignContent = AlignmentCommon | AlignContentNative | 'baseline' | 'normal' | 'space-evenly';
type AlignContentNative = AlignmentCommonNative | 'space-around' | 'space-between' | 'stretch';

export type AlignItems = AlignmentCommon | AlignItemsNative | 'auto' | 'self-end' | 'self-start';
type AlignItemsNative = AlignmentCommonNative | 'baseline' | 'stretch';

export type AlignSelf = AlignmentCommon | AlignSelfNative | 'normal' | 'self-end' | 'self-start';
type AlignSelfNative = AlignmentCommonNative | 'auto' | 'baseline' | 'stretch';

export type AnimationDirection = CSSWideKeyword | 'alternate' | 'alternate-reverse' | 'normal' | 'reverse';

export type AnimationFillMode = 'backwards' | 'both' | 'forwards' | 'none';

export type AnimationIterationCount = number | 'infinite';

export type AnimationPlayState = CSSWideKeyword | 'paused' | 'running';

export type BackfaceVisibility = CSSWideKeyword | 'hidden' | 'visible';

export type BackgroundAttachment = CSSWideKeyword | 'fixed' | 'local' | 'scroll';

export type BackgroundClip = BackgroundOrigin | 'text';

export type BackgroundOrigin = CSSWideKeyword | 'border-box' | 'content-box' | 'padding-box';

export type BorderCollapse = CSSWideKeyword | 'collapse' | 'separate';

export interface Breakpoints {
  lg: number;
  md: number;
  sm: number;
  xl: number;
  xs: number;
  xxl: number;
}

export interface Context {
  bgC: string;
  c: string;
}

type CSSWideKeyword = 'initial' | 'inherit' | 'unset';

type Cursor = CSSWideKeyword | 'auto' | 'crosshair' | 'grab' | 'help' | 'not-allowed' | 'pointer' | 'wait' | 'zoom-in';

type Direction = CSSWideKeyword | DirectionNative;
type DirectionNative = 'inherit' | 'ltr' | 'rtl';

type DisplayNative = 'flex' | 'none';

export type FelaType = 'KEYFRAME' | 'RULE' | 'STATIC';

export type FlexDirection = CSSWideKeyword | FlexDirectionNative;
type FlexDirectionNative = 'column' | 'column-reverse' | 'row' | 'row-reverse';

export type FlexWrap = CSSWideKeyword | FlexWrapNative | 'wrap-reverse';
type FlexWrapNative = 'wrap' | 'nowrap';

export type FontStyle = CSSWideKeyword | FontStyleNative | 'oblique';
type FontStyleNative = 'italic' | 'normal';

export type FontVariant = CSSWideKeyword | FontVariantNative | 'common-ligatures small-caps';
type FontVariantNative = 'lining-nums' | 'oldstyle-nums' | 'proportional-nums' | 'small-caps' | 'tabular-nums';

export type FontWeight = CSSWideKeyword | FontWeightNative | 'bolder' | 'lighter';
type FontWeightNative = 'bold' | 'normal' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type JustifyContent = AlignmentCommon | JustifyContentNative | 'left' | 'normal' | 'right' | 'stretch';
type JustifyContentNative = AlignmentCommonNative | 'space-around' | 'space-between' | 'space-evenly';

export type Keyframe<Props = any> = (props?: Props) => C.Dict<Styles>;

type ObjectFit = CSSWideKeyword | 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export type OutlineStyle =
  | CSSWideKeyword
  | 'auto'
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'groove'
  | 'inset'
  | 'none'
  | 'outset'
  | 'ridge'
  | 'solid';

type Overflow = CSSWideKeyword | OverflowNative | 'auto';
type OverflowNative = 'hidden' | 'scroll' | 'visible';

export type PointerEvents =
  | CSSWideKeyword
  | 'all'
  | 'auto'
  | 'fill'
  | 'none'
  | 'painted'
  | 'stroke'
  | 'visible'
  | 'visibleFill'
  | 'visiblePainted'
  | 'visibleStroke';

export type Position = CSSWideKeyword | PositionNative | 'fixed' | 'static' | 'sticky';
type PositionNative = 'absolute' | 'relative';

export interface PureStyles {
  absolute?: boolean | number;
  ac?: AlignContent;
  ai?: AlignItems;
  alignContent?: AlignContent;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  an?: string;
  anDe?: number | string;
  anDi?: AnimationDirection;
  anDu?: number | string;
  anFM?: AnimationFillMode;
  anIC?: AnimationIterationCount;
  anNa?: string;
  anPS?: AnimationPlayState;
  anTF?: string;
  animation?: string;
  animationDelay?: number | string;
  animationDirection?: AnimationDirection;
  animationDuration?: number | string;
  animationFillMode?: AnimationFillMode;
  animationIterationCount?: AnimationIterationCount;
  animationName?: string;
  animationPlayState?: AnimationPlayState;
  animationTimingFunction?: string;
  as?: AlignSelf;
  aspectRatio?: number;
  bC?: string;
  bRd?: number | string;
  bS?: string;
  bW?: number | string;
  background?: string;
  backgroundAttachment?: BackgroundAttachment;
  backgroundClip?: BackgroundClip;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundOrigin?: BackgroundOrigin;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundSize?: string;
  bbC?: string;
  bblRd?: number | string;
  bbrRd?: number | string;
  bbS?: string;
  bbW?: number | string;
  bg?: string;
  bgA?: BackgroundAttachment;
  bgC?: string;
  bgCl?: BackgroundClip;
  bgI?: string;
  bgO?: BackgroundOrigin;
  bgP?: string;
  bgR?: string;
  bgS?: string;
  blC?: string;
  blS?: string;
  blW?: number | string;
  borderColor?: string;
  bottom?: number | string;
  brC?: string;
  brS?: string;
  brW?: number | string;
  btC?: string;
  btS?: string;
  btW?: number | string;
  bxC?: string;
  bxS?: string;
  bxW?: number | string;
  byC?: string;
  byS?: string;
  byW?: number | string;
  c?: string;
  col?: boolean | string;
  color?: string;
  content?: string;
  ct?: string;
  cursor?: Cursor;
  d?: string;
  display?: string;
  fix?: boolean | number;
  fixB?: boolean | number;
  fixed?: boolean | number;
  fixL?: boolean | number;
  fixR?: boolean | number;
  fixT?: boolean | number;
  fixX?: boolean | number;
  fixY?: boolean | number;
  fl?: number | string;
  flB?: number | string;
  flD?: FlexDirection;
  flF?: string;
  flG?: number;
  flS?: number;
  flW?: FlexWrap;
  flex?: number | string;
  flexBasis?: number | string;
  flexDirection?: FlexDirection;
  flexFlow?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: FlexWrap;
  fo?: number | string;
  foF?: string;
  foS?: FontStyle;
  foV?: FontVariant;
  foW?: FontWeight;
  fontFamily?: string;
  fontSize?: number | string;
  fontStyle?: FontStyle;
  fontVariant?: FontVariant;
  fontWeight?: FontWeight;
  h?: number | string;
  height?: number | string;
  hide?: boolean | string;
  jc?: JustifyContent;
  justifyContent?: JustifyContent;
  invisible?: boolean;
  left?: number | string;
  letterSpacing?: number | string;
  lh?: number | string;
  lineHeight?: number | string;
  lS?: number | string;
  m?: number | string;
  maxH?: number | string;
  maxW?: number | string;
  mb?: number | string;
  minH?: number | string;
  minW?: number | string;
  ml?: number | string;
  mr?: number | string;
  mt?: number | string;
  mx?: number | string;
  my?: number | string;
  noGrow?: boolean;
  noShrink?: boolean;
  oC?: string;
  oO?: number | string;
  oS?: OutlineStyle;
  oW?: number | string;
  objectFit?: ObjectFit;
  objectPosition?: number | string;
  onAfter?: Styles;
  onBefore?: Styles;
  onFocus?: Styles;
  onHover?: Styles;
  opacity?: number | string;
  order?: number;
  outline?: string;
  outlineColor?: string;
  outlineOffset?: number | string;
  outlineStyle?: OutlineStyle;
  outlineWidth?: number | string;
  overflow?: Overflow;
  p?: number | string;
  pE?: PointerEvents;
  pb?: number | string;
  pin?: boolean | number;
  pinB?: boolean | number;
  pinL?: boolean | number;
  pinR?: boolean | number;
  pinT?: boolean | number;
  pinX?: boolean | number;
  pinY?: boolean | number;
  pl?: number | string;
  pointerEvents?: PointerEvents;
  position?: Position;
  pr?: number | string;
  pt?: number | string;
  px?: number | string;
  py?: number | string;
  relative?: boolean;
  right?: number | string;
  row?: boolean | string;
  s?: number | string;
  sh?: string;
  size?: number | string;
  tSh?: string;
  textAlign?: TextAlign;
  textDecorationColor?: string;
  textDecorationLine?: TextDecorationLine;
  textDecorationStyle?: TextDecorationStyle;
  textShadow?: string;
  textTranform?: TextTransform;
  top?: number | string;
  tr?: string;
  transform?: string;
  transition?: string;
  uppercase?: boolean;
  w?: number | string;
  width?: number | string;
  wrap?: boolean;
  zIndex?: number;
}

export interface Renderer {
  renderRule<Props>(rule: Rule<Props>, props: Props): string;
  renderKeyframe<Props>(keyFrame: Keyframe<Props>, props: Props): string;
  renderFont<Props>(family: string, files: string[], props: Props): void;
  renderStatic(style: string, selector?: string): void;
  renderStatic(style: Styles, selector: string): void;
  renderToString(): string;
  /*subscribe(
    event: (
      msg:
        | E.ISubscribeRuleOrStaticObjectMessage
        | E.ISubscribeKeyframesMessage
        | E.ISubscribeFontFaceMessage
        | E.ISubscribeStaticStringMessage
        | E.ISubscribeClearMessage
    ) => void
  ): { unsubscribe: () => void };*/
  clear(): void;
}

export type Responsive<T> = T | ResponsiveValues<T>;
export type ResponsiveStyles = PureStyles & { [P in keyof Breakpoints]?: PureStyles };
export type ResponsiveValues<T> = { [P in (keyof Breakpoints) | 'base']?: T };

export type Rule<Props = any> = (props?: Props) => Styles;

export type Styles = { [P in keyof PureStyles]?: Responsive<PureStyles[P]> };
export type Styler<Props = any> = Rule<Props> | Styles | { keyframes: Keyframe<Props> | C.Dict<Styles>; rules?: Rule<Props> | Styles };
export type Stylers = C.Dict<Styler>;

type TextAlign = CSSWideKeyword | TextAlignNative | 'end' | 'match-parent' | 'start';
type TextAlignNative = 'auto' | 'center' | 'justify' | 'left' | 'right';

type TextDecorationLine = CSSWideKeyword | TextDecorationLineNative | 'overline';
type TextDecorationLineNative = 'line-through' | 'none' | 'underline' | 'underline line-through';

type TextAlignVertical = 'auto' | 'bottom' | 'center' | 'top';

type TextDecorationStyle = CSSWideKeyword | TextDecorationStyleNative | 'wavy';
type TextDecorationStyleNative = 'dashed' | 'dotted' | 'double' | 'solid';

type TextTransform = CSSWideKeyword | 'capitalize' | 'full-width' | 'lowercase' | 'none' | 'uppercase';

export interface Theme {
  contexts: C.Dict<Context>;
  breakpoints: Breakpoints;
  colors: C.Dict<string>;
  maxWidth: number;
  spaceBase: number;
}

type WritingDirection = 'auto' | 'ltr' | 'rtl';

export type ZIndex = CSSWideKeyword | 'auto' | number;
