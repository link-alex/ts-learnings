import axios, { AxiosResponse } from 'axios';

import { Eventing } from './Eventing';

export class Collection<T, P> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(
    public rootUrl: string,
    public deserialize: (data: P) => T, 
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      this.models = [];

      response.data.forEach((value: P) => {
        this.models.push(this.deserialize(value));
      });

      this.trigger('changed');
    });
  }
}
