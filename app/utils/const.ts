const STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
};

const STATUS_OPTIONS = [
  { label: 'Chưa làm', value: STATUS.TODO },
  { label: 'Đang thực hiện', value: STATUS.IN_PROGRESS },
  { label: 'Đã hoàn thành', value: STATUS.DONE },
];

export { STATUS, STATUS_OPTIONS };
