import { UserForm } from './UserForm';
import { UserInfo } from './UserInfo';

import { BaseView } from './BaseView';

import { User, UserProps } from '../models/User';

export class UserEdit extends BaseView<User, UserProps> {
  
  regionsMap(): { [key: string]: string } {
    return {
      userInfo: '#user-info',
      userForm: '#user-form',
    };
  }

  onRender(): void {
    const userInfo = new UserInfo(this.regions.userInfo, this.model);
    userInfo.render();

    const userForm = new UserForm(this.regions.userForm, this.model);    
    userForm.render();
  }

  template(): string {
    return `
      <div>
        <div id="user-info"></div>
        <div id="user-form"></div>
      </div>
    `;
  }
}
