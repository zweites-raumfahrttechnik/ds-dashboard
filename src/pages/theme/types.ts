export interface GenCodeFormModel {
  uuid: string;
  group: string;
  artifact: string;
  name: string;
  describe?: string;
  nacosUrl?: string;
  nacosPort?: number;
  zipkinUrl?: string;
  zipkinPort?: number;
}

export const defaultGenCodeFormValue: GenCodeFormModel = {
  uuid: '',
  group: 'org.buaaica',
  artifact: 'demo',
  name: 'theme_server',
  describe: 'Demo project for Theme Server',
  nacosUrl: '127.0.0.1',
  nacosPort: 8848,
  zipkinUrl: '127.0.0.1',
  zipkinPort: 9411,
};
