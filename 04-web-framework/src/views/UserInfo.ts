import { BaseView } from './BaseView';

import { User, UserProps } from '../models/User';

export class UserInfo extends BaseView<User, UserProps> {

  template(): string {
    return `
      <div>
        <h4>User info</h4>
        <div>name: ${this.model.get('name')}</div>
        <div>age: ${this.model.get('age')}</div>
      </div>
    `;
  }
}
