export { Ref, SetupContext } from '@vue/composition-api';
import { Observable as BaseObservable, Subject as BaseSubject } from 'rxjs';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';

export { Struct } from 'superstruct';
export type Observable<T = any> = BaseObservable<T>;
export type Subject<T = any> = BaseSubject<T>;
export { VueI18n, VueRouter };
export { Subscription } from 'rxjs';
