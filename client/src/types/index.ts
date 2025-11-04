export type RetrospectiveItem =
  | string
  | {
      type: 'gif';
      url: string;
      text?: string;
    };

export type RetrospectiveColumnKey = 'good' | 'improve' | 'action';
export interface RetrospectiveColumn {
  title: string;
  keyName: RetrospectiveColumnKey;
}
