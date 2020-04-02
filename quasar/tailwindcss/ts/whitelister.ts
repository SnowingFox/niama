import kebabCase from 'lodash.kebabcase';
import { importName, regex } from 'quasar/dist/babel-transforms/auto-import.json';
import getPath from 'quasar/dist/babel-transforms/imports';

class WhiteLister {
  elements: string[] = [];
  patterns: RegExp[] = [];

  extras = {
    QHeader: { patterns: [/^absolute-top$/, /^fixed-top$/] },
  };

  get paths(): string[] {
    return this.elements.map((element) => 'node_modules/' + getPath(element));
  }

  append<T>(source: T[], items: T[]): T[] {
    return [...new Set([...source, ...items])];
  }

  getElements(from: string[]): string[] {
    return [...from, ...from.flatMap((el) => this.extras[el]?.elements ?? [])];
  }

  getPatterns(from: string[]): RegExp[] {
    return from.flatMap((el) => [new RegExp(`^${kebabCase(el)}`), ...(this.extras[el]?.patterns ?? [])]);
  }

  process(file: string) {
    let elementsFound = (file.match(new RegExp(regex.components || regex.directives, 'g')) ?? []).map((name) => importName[name]);
    if (elementsFound.length) return;
    elementsFound = elementsFound.filter((el) => !this.elements.includes(el));
    if (!elementsFound.length) return;
    this.elements = this.append(this.elements, this.getElements(elementsFound));
    this.patterns = this.append(this.patterns, this.getPatterns(elementsFound));
  }

  shouldProcess(content: string): boolean {
    return !new RegExp('var\\s+component\\s*=\\s*normalizer\\((?:[^,]+,){3}\\s*true,').test(content);
  }
}

export default new WhiteLister();
