import { Model } from '../models/Model';

export abstract class BaseView<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public root: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  regionsMap(): { [key: string]: string } {
    return {};
  }

  bindModel() {
    this.model.on('changed', () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach((element: Element): void => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const region = fragment.querySelector(selector);

      if (region) {
        this.regions[key] = region;
      }
    }
  }

  onRender(): void {
    
  }

  render(): void {
    this.root.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.root.append(templateElement.content);
  }
}
