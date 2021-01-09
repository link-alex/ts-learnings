import { Collection } from '../models/Collection';

export abstract class BaseCollectionView<T, P> {
  constructor(public root: Element, public collection: Collection<T, P>) {}

  abstract renderItem(model: T, root: Element): void;

  render(): void {
    this.root.innerHTML = '';

    const templateElement = document.createElement('template');

    const ulElement = document.createElement('ul');
    
    for (let model of this.collection.models) {
      const liElement = document.createElement('li');
      this.renderItem(model, liElement);
      ulElement.append(liElement);
    }

    templateElement.content.append(ulElement);
    this.root.append(templateElement.content);
  }
}
