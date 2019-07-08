// PROPS ===================================================================================================================================

export type ApiIdNames = 'id';
export type ApiTypeNames = '__typename';
export type ApiRNames = ApiIdNames | ApiTypeNames;

// OBJECTS =================================================================================================================================

export interface ApiE {
  id: string;
}

export interface ApiR extends ApiE {
  __typename: string;
}
