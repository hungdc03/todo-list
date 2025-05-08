const STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
};

const STATUS_OPTIONS = [
  { label: 'Not started', value: STATUS.TODO },
  { label: 'In progress', value: STATUS.IN_PROGRESS },
  { label: 'Completed', value: STATUS.DONE },
];

export { STATUS, STATUS_OPTIONS };
