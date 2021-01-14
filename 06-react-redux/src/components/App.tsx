import React from 'react';

import { connect } from 'react-redux';

import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = { fetching: false };
  }

  componentDidUpdate(previousProps: AppProps): void {
    if (!previousProps.todos.length && this.props.todos.length > 0) {
      this.setState({ fetching: false });
    }
  }

  onFetchButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({ fetching: true });
  }

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
          {todo.title}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onFetchButtonClick}>Fetch</button>
        {this.state.fetching
          ? <div>Loading...</div>
          : this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

export const App = connect(
  mapStateToProps,
  {
    fetchTodos,
    deleteTodo,
  }
)(_App);
