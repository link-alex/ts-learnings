import { Model } from './Model';

import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Collection } from './Collection';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
};

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static buildUser(props: UserProps): User {
    return new User(
      new Attributes<UserProps>(props),
      new ApiSync<UserProps>(rootUrl),
      new Eventing(),
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      rootUrl,
      (data: UserProps) => User.buildUser(data), 
    );
  }

  setRandomAge(): void {
    this.set({ age: Math.round(Math.random() * 50) });
  }
}
