/**
 * @packageDocumentation
 * @module @niama/core/types
 */

import * as Rxjs from 'rxjs';
import { VueConstructor } from 'vue';
import BaseVueI18n from 'vue-i18n';
import BaseVueRouter from 'vue-router';

export { ComponentOptions, VueConstructor } from 'vue';
export type ComponentInstance = InstanceType<VueConstructor>;

export { Ref, SetupContext } from '@vue/composition-api';

export { Location, RawLocation, Route, RouteConfig } from 'vue-router';
export type VueRouter = BaseVueRouter;

export { AsyncSubject, Subscription } from 'rxjs';
export type Observable<T = any> = Rxjs.Observable<T>;
export type Subject<T = any> = Rxjs.Subject<T>;

export { I18nOptions as I18nO, TranslateResult  } from 'vue-i18n';
export type VueI18n = BaseVueI18n;
