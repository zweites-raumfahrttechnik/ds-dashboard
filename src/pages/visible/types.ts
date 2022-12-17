export interface SearchParams {
  pg: number;
  size: number;
  userUuid?: string;
}

export type SearchFormData = Omit<SearchParams, 'pg' | 'size'>;
