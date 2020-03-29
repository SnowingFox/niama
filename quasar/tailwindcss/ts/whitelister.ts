import data from 'quasar/dist/babel-transforms/auto-import.json';
import getPath from 'quasar/dist/babel-transforms/imports';

class WhiteLister {
  elements: string[] = [];
  patterns: string[] = [];

  get paths(): string[] {
    return this.elements.map((element) => 'node_modules/' + getPath(element));
  }

  process(file: string) {
    const elements = file.match(new RegExp(data.regex.components || data.regex.directives, 'g'));
    if (elements) this.elements = [...new Set([...this.elements, ...elements.map((name) => data.importName[name])])];
    if (file.match('QBtn|q-btn')) this.patterns = [...new Set([...this.patterns, '/^q-btn/'])];
  }

  shouldProcess(content: string): boolean {
    return !/var\s+component\s*=\s*normalizer\((?:[^,]+,){3}\s*true,/.test(content);
  }
}

export default new WhiteLister();
