import { User } from './models/User';

import { UserList } from './views/UserList';
import { UserEdit } from './views/UserEdit';

// user form
const user = User.buildUser({ name: 'Alex', age: 28 });
const root = document.getElementById('user-root');

if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
}

// users list
let list: UserList;

const collection = User.buildUserCollection();

function renderList(): void {
  const root = document.getElementById('list-root');

  if (root) {
    list = new UserList(root, collection);
    list.render();
  }
}

collection.on('changed', renderList);
collection.fetch();

user.on('saved', () => {
  collection.fetch();
});
