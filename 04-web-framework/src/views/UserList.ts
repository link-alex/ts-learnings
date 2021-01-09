import { BaseCollectionView } from './BaseCollectionView';
import { UserListItem } from './UserListItem';

import { User, UserProps } from '../models/User';

export class UserList extends BaseCollectionView<User, UserProps> {
  renderItem(model: User, root: Element): void {
    const listItem = new UserListItem(root, model);
    listItem.render();
  }
}
