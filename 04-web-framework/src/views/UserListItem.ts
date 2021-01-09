import { BaseView } from './BaseView';

import { User, UserProps } from '../models/User';

export class UserListItem extends BaseView<User, UserProps> {

  template(): string {
    return `
      id: ${this.model.get('id')}, name: ${this.model.get('name')}, age: ${this.model.get('age')}
    `;
  }
}
