const KEY_TODOS = 'todos';

const createTodoByLocalStorage = (todo: any) => {
  const todos = JSON.parse(localStorage.getItem(KEY_TODOS) || '[]');
  todos.push(todo);
  localStorage.setItem(KEY_TODOS, JSON.stringify(todos));
};

const getTodosByLocalStorage = () => {
  return JSON.parse(localStorage.getItem(KEY_TODOS) || '[]');
};

const getAllQueryParams = () => {
  return Object.fromEntries(new URLSearchParams(window.location.search));
};

export { createTodoByLocalStorage, getTodosByLocalStorage, getAllQueryParams };
