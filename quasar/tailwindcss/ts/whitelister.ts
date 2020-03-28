import data from 'quasar/dist/babel-transforms/auto-import.json';
import getPath from 'quasar/dist/babel-transforms/imports';

class WhiteLister {
  elements: string[] = [];
  regex = new RegExp(data.regex.components || data.regex.directives, 'g');

  get paths() {
    return this.elements.map((element) => 'node_modules/' + getPath(element));
  }

  process(file: string) {
    const elements = file.match(this.regex);
    if (elements) this.elements = [...new Set([...this.elements, ...elements.map((name) => data.importName[name])])];
  }

  shouldProcess(content: string): boolean {
    return !/var\s+component\s*=\s*normalizer\((?:[^,]+,){3}\s*true,/.test(content);
  }
}

export default new WhiteLister();
