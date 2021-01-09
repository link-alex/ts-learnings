import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attrs: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events,
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attrs.get;

  set(update: T): void {
    this.attrs.set(update);
    this.events.trigger('changed');
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch')
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    const data = this.attrs.getAll();
    this.sync.save(data).then((): void => {
      this.events.trigger('saved');
    }).catch(() => {
      this.events.trigger('error');
    });
  }
}
