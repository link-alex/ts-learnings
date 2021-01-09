import { BaseView } from './BaseView';

import { User, UserProps } from '../models/User';

export class UserForm extends BaseView<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:#set-name-btn': this.onNameChangeButtonClick,
      'click:#set-age-btn': this.onRandomAgeButtonClick,
      'click:#save-btn': this.onSaveButtonClick,
    }
  }

  onRandomAgeButtonClick = (): void => {
    this.model.setRandomAge();
  }

  onSaveButtonClick = (): void => {
    this.model.save();
  }

  onNameChangeButtonClick = (): void => {
    const input = this.root.querySelector('input');

    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  }

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('name')}" />
        <button id="set-name-btn">Change name</button>
        <div>
          <button id="set-age-btn">Set random age</button>
        </div>
        <div>
          <button id="save-btn">Save</button>
        </div>
      </div>
    `;
  }
}
