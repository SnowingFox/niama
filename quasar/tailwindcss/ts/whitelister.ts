import data from 'quasar/dist/babel-transforms/auto-import.json';

class WhiteLister {
  elements: string[] = [];
  regex = new RegExp(data.regex.components || data.regex.directives, 'g');

  process(file: string) {
    const elements = this.regex.exec(file);
    if (elements) this.elements = [...new Set([...this.elements, ...elements.map((name) => data.importName[name])])];
  }

  shouldProcess(content: string): boolean {
    return !/var\s+component\s*=\s*normalizer\((?:[^,]+,){3}\s*true,/.test(content);
  }
}

export default new WhiteLister();
