export interface SearchParams {
  pg: number;
  size: number;
  userUuid?: string;
  userName?: string;
}

export type SearchFormData = Omit<SearchParams, 'pg' | 'size'>;
