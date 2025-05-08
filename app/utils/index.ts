const KEY_TODOS = 'todos';

const createTodoByLocalStorage = (todo: any) => {
  const todos = JSON.parse(localStorage.getItem(KEY_TODOS) || '[]');
  todos.push(todo);
  localStorage.setItem(KEY_TODOS, JSON.stringify(todos));
};

const getTodosByLocalStorage = () => {
  return JSON.parse(localStorage.getItem(KEY_TODOS) || '[]');
};

const getTodoById = (id: string) => {
  const todos = getTodosByLocalStorage();
  console.log('🚀 ~ getTodoById ~ todos:', todos);
  return todos.find((todo: any) => todo.id === id);
};

const updateTodoByLocalStorage = (id: string, todo: any) => {
  const todos = getTodosByLocalStorage();
  const index = todos.findIndex((todo: any) => todo.id === id);
  todos[index] = todo;
  localStorage.setItem(KEY_TODOS, JSON.stringify(todos));
};

const deleteTodoByLocalStorage = (id: string) => {
  const todos = getTodosByLocalStorage();
  const index = todos.findIndex((todo: any) => todo.id === id);
  todos.splice(index, 1);
  localStorage.setItem(KEY_TODOS, JSON.stringify(todos));
};
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export {
  createTodoByLocalStorage,
  getTodosByLocalStorage,
  getTodoById,
  generateId,
  updateTodoByLocalStorage,
  deleteTodoByLocalStorage,
};
