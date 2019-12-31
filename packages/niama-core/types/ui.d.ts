// PARAMS ==================================================================================================================================

export interface NotifyP {
  classes?: string;
  icon?: string;
  id: string;
}

export interface NotifyFailP extends Omit<NotifyP, 'id'> {
  error: Error;
}
