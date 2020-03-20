import pug from 'pug';

export type Casing = 'camel' | 'kebab' | 'pascal' | 'raw';
export type ClassType = 'B' | 'BE' | 'BEM' | 'BM' | 'E' | 'EM';

export interface LoaderO {
  casingB?: Casing;
  casingE?: Casing;
  casingM?: Casing;
  data?: Record<string, any>;
  separatorE?: string;
  separatorM?: string;
}

export interface CompilerO extends pug.Options {
  plugins: unknown[];
}

export interface Template extends pug.compileTemplate {
  dependencies: string[];
}

export type Depths = { extras: number[]; tab: number };

export type FormatP = { casing: Casing; val: string };
export type ModifierP = { casing: Casing; prefix?: string; val: string };
export type ModifierR = { main: string; val: string };

export interface Loc {
  end: Pos;
  start: Pos;
}

export interface Pos {
  column: number;
  line: number;
}

export type LexTokenType =
  | ':'
  | '&attributes'
  | 'attribute'
  | 'block'
  | 'blockcode'
  | 'call'
  | 'case'
  | 'class'
  | 'code'
  | 'comment'
  | 'default'
  | 'doctype'
  | 'dot'
  | 'each'
  | 'else-if'
  | 'else'
  | 'end-attributes'
  | 'end-pipeless-text'
  | 'end-pug-interpolation'
  | 'eos'
  | 'extends'
  | 'filter'
  | 'id'
  | 'if'
  | 'include'
  | 'indent'
  | 'interpolated-code'
  | 'interpolation'
  | 'mixin-block'
  | 'mixin'
  | 'newline'
  | 'outdent'
  | 'path'
  | 'slash'
  | 'start-attributes'
  | 'start-pipeless-text'
  | 'start-pug-interpolation'
  | 'tag'
  | 'text-html'
  | 'text'
  | 'when'
  | 'while'
  | 'yield';

export interface LexToken<Type extends LexTokenType> {
  type: Type;
  loc: Loc;
}

export interface TagToken extends LexToken<'tag'> {
  val: string;
}

export type StartAttributesToken = LexToken<'start-attributes'>;

export interface AttributeToken extends LexToken<'attribute'> {
  name: string;
  val: string | boolean;
  mustEscape: boolean;
}

export type EndAttributesToken = LexToken<'end-attributes'>;

export interface IndentToken extends LexToken<'indent'> {
  val: number;
}

export interface ClassToken extends LexToken<'class'> {
  val: string;
}

export type OutdentToken = LexToken<'outdent'>;

export type EosToken = LexToken<'eos'>;

export interface CommentToken extends LexToken<'comment'> {
  val: string;
  buffer: boolean;
}

export type NewlineToken = LexToken<'newline'>;

export interface TextToken extends LexToken<'text'> {
  val: string;
}

export interface InterpolatedCodeToken extends LexToken<'interpolated-code'> {
  mustEscape: boolean;
  buffer: boolean;
  val: string;
}

export interface CodeToken extends LexToken<'code'> {
  val: string;
  mustEscape: boolean;
  buffer: boolean;
}

export interface IdToken extends LexToken<'id'> {
  val: string;
}

export type StartPipelessTextToken = LexToken<'start-pipeless-text'>;

export type EndPipelessTextToken = LexToken<'end-pipeless-text'>;

export interface DoctypeToken extends LexToken<'doctype'> {
  val: string;
}

export type DotToken = LexToken<'dot'>;

export interface BlockToken extends LexToken<'block'> {
  val: string;
  mode: 'replace' | 'prepend' | 'append';
}

export type ExtendsToken = LexToken<'extends'>;

export interface PathToken extends LexToken<'path'> {
  val: string;
}

export type StartPugInterpolationToken = LexToken<'start-pug-interpolation'>;

export type EndPugInterpolationToken = LexToken<'end-pug-interpolation'>;

export interface InterpolationToken extends LexToken<'interpolation'> {
  val: string;
}

export type IncludeToken = LexToken<'include'>;

export interface FilterToken extends LexToken<'filter'> {
  val: string;
}

export interface CallToken extends LexToken<'call'> {
  val: string;
  args: string;
}

export interface MixinToken extends LexToken<'mixin'> {
  val: string;
  args: string | null;
}

export interface IfToken extends LexToken<'if'> {
  val: string;
}

export type MixinBlockToken = LexToken<'mixin-block'>;

export interface ElseToken extends LexToken<'else'> {
  val: string;
}

export interface AndAttributesToken extends LexToken<'&attributes'> {
  val: string;
}

export interface TextHtmlToken extends LexToken<'text-html'> {
  val: string;
}

export interface EachToken extends LexToken<'each'> {
  val: string;
  key: string | null;
  code: string;
}

export interface WhileToken extends LexToken<'while'> {
  val: string;
}

export interface CaseToken extends LexToken<'case'> {
  val: string;
}

export interface WhenToken extends LexToken<'when'> {
  val: string;
}

export type ColonToken = LexToken<':'>;

export type DefaultToken = LexToken<'default'>;

export interface ElseIfToken extends LexToken<'else-if'> {
  val: string;
}

export type BlockcodeToken = LexToken<'blockcode'>;

export type YieldToken = LexToken<'yield'>;

export type SlashToken = LexToken<'slash'>;

export type Token =
  | AndAttributesToken
  | AttributeToken
  | BlockcodeToken
  | BlockToken
  | CallToken
  | CaseToken
  | ClassToken
  | CodeToken
  | ColonToken
  | CommentToken
  | DefaultToken
  | DoctypeToken
  | DotToken
  | EachToken
  | ElseIfToken
  | ElseToken
  | EndAttributesToken
  | EndPipelessTextToken
  | EndPugInterpolationToken
  | EosToken
  | ExtendsToken
  | FilterToken
  | IdToken
  | IfToken
  | IncludeToken
  | IndentToken
  | InterpolatedCodeToken
  | InterpolationToken
  | MixinBlockToken
  | MixinToken
  | NewlineToken
  | OutdentToken
  | PathToken
  | SlashToken
  | StartAttributesToken
  | StartPipelessTextToken
  | StartPugInterpolationToken
  | TagToken
  | TextHtmlToken
  | TextToken
  | WhenToken
  | WhileToken
  | YieldToken;
