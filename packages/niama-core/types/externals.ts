import { Observable as BaseObservable, Subject as BaseSubject } from 'rxjs';
import { VueConstructor } from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';

export type ComponentInstance = InstanceType<VueConstructor>;
export type Observable<T = any> = BaseObservable<T>;
export type Subject<T = any> = BaseSubject<T>;
export { VueI18n, VueRouter };
export { Ref, SetupContext } from '@vue/composition-api';
export { AsyncSubject, Subscription } from 'rxjs';
export { Struct } from 'superstruct';
export { Location, RawLocation, Route, RouteConfig } from 'vue-router';
