import * as webpack from 'webpack';

import wl from './whitelister';

export default function (this: webpack.loader.LoaderContext, content: string): string {
  if (!this.resourceQuery && wl.shouldProcess(content)) wl.process(this.fs.readFileSync(this.resource, 'utf-8').toString());
  return content;
}
