import * as T from './typings';

export const statusesEn: T.I18n<T.Status> = {
  BLOCKED: 'Blocked',
  INCORRECT: 'Incorrect',
  OK: 'Ok',
  PENDING: 'Pending',
};

export const statusesFr: T.I18n<T.Status> = {
  BLOCKED: 'Bloqué',
  INCORRECT: 'Incorrect',
  OK: 'Actif',
  PENDING: 'En attente',
};

export const statuses: T.Status[] = Object.keys(statusesEn) as T.Status[];
