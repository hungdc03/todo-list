import React, { memo, useState } from 'react';
import {
  CheckCircleFilled,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { STATUS, STATUS_OPTIONS } from '~/utils/const';
import { Button, Card, Typography } from 'antd';
import { styled } from 'styled-components';
import CustomButton from './Button';
import _ from 'lodash';
import StyledCard from './StyledCard';
const { Title, Paragraph } = Typography;

const CustomCard = styled(Card)`
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff !important;
`;

const CustomAddSubtask = styled(Button)`
  outline: none;
  &:hover {
    border-color: #000 !important;
    color: #000 !important;
  }
`;

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskDetailTailwindProps {
  title?: string;
  description?: string;
  createdAt?: string;
  status?: string;
  subTasks?: SubTask[];
  onEdit?: () => void;
  onStatusChange?: (status: string) => void;
  onAddSubTask?: (title: string) => void;
  onSubTaskToggle?: (id: string, completed: boolean) => void;
  onSubTaskDelete?: (id: string) => void;
  onEditSubTask?: (id: string, title: string) => void;
  onDeleteTask?: () => void;
}

const TaskDetailTailwind: React.FC<TaskDetailTailwindProps> = ({
  title = '',
  description = '',
  status = STATUS.TODO,
  subTasks = [],
  onEdit,
  onStatusChange,
  onAddSubTask = (value: string) => {},
  onSubTaskToggle,
  onSubTaskDelete,
  onDeleteTask,
}) => {
  const [isCreateSubTask, setIsCreateSubTask] = useState(false);
  const [subTaskTitle, setSubTaskTitle] = useState('');

  const handleSubmitSubTask = (value: string) => {
    if (_.trim(value)) {
      setIsCreateSubTask(false);
      onAddSubTask?.(value);
      setSubTaskTitle('');
    }
  };

  const handleAddSubTask = () => {
    setIsCreateSubTask(true);
  };

  const handleCancelAddSubTask = () => {
    setIsCreateSubTask(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
      <Typography>
        <Title level={2} className="mb-2 ">
          {title}
        </Title>
        <Paragraph style={{ fontSize: '18px' }} className="text-gray-700 mb-6 ">
          {description}
        </Paragraph>
      </Typography>

      <div className="mb-6 mt-4">
        <h3 className="font-medium mb-2">Status</h3>
        <div className="flex gap-2">
          <button
            className={`flex items-center cursor-pointer px-3 py-1.5 rounded border ${
              status === STATUS.TODO
                ? 'border-black bg-black text-white'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
            onClick={() => onStatusChange?.(STATUS.TODO)}
          >
            Todo
          </button>

          <button
            className={`flex items-center cursor-pointer px-3 py-1.5 rounded border ${
              status === STATUS.IN_PROGRESS
                ? ' bg-black text-white'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
            onClick={() => onStatusChange?.(STATUS.IN_PROGRESS)}
          >
            <ClockCircleOutlined className="mr-1.5" />
            In Progress
          </button>

          <button
            className={`flex items-center cursor-pointer px-3 py-1.5 rounded ${
              status === STATUS.DONE
                ? 'bg-black text-white'
                : 'border border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
            onClick={() => onStatusChange?.(STATUS.DONE)}
          >
            <CheckOutlined className="mr-1.5" />
            Done
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">
            Subtasks {''}
            {subTasks.length > 0
              ? `(${Math.round((subTasks.filter((st) => st.completed).length / subTasks.length) * 100)}%)`
              : ''}
          </h3>
          <CustomAddSubtask size="middle" onClick={handleAddSubTask}>
            <PlusOutlined className="mr-1" />
            Add Subtask
          </CustomAddSubtask>
        </div>

        <div className="space-y-2">
          <CustomCard>
            {isCreateSubTask && (
              <div className="flex items-center">
                <input
                  onChange={(e) => setSubTaskTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Subtask title"
                />
                <CustomButton
                  className="ml-1"
                  overrideClassName="px-4 rounded-md py-1.5"
                  onClick={() => handleSubmitSubTask(subTaskTitle)}
                >
                  Add
                </CustomButton>
                <button
                  className="ml-2 px-4 py-1.5 cursor-pointer hover:bg-gray-100 rounded-md"
                  onClick={handleCancelAddSubTask}
                >
                  Cancel
                </button>
              </div>
            )}
            {subTasks.length === 0 && !isCreateSubTask && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">No subtasks</p>
              </div>
            )}
            {subTasks.map((subtask) => (
              <div key={subtask.id} className="flex items-center justify-between py-1">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={(e) => onSubTaskToggle?.(subtask.id, e.target.checked)}
                    className="w-4 h-4 border-gray-300 rounded mr-2 accent-black"
                  />
                  <span className={`${subtask.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {subtask.title}
                  </span>
                </label>
                <button
                  onClick={() => onSubTaskDelete?.(subtask.id)}
                  className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                >
                  <DeleteOutlined />
                </button>
              </div>
            ))}
          </CustomCard>
        </div>
      </div>
      <div className="flex justify-end gap-2 items-start mb-4 mt-16">
        <Button onClick={onDeleteTask} danger>
          <DeleteOutlined className="mr-1" />
          Delete
        </Button>
        <button className="flex items-center cursor-pointer px-3 py-1.5 rounded hover:bg-gray-100" onClick={onEdit}>
          <EditOutlined className="mr-2" />
          Edit
        </button>
      </div>
    </div>
  );
};

export default memo(TaskDetailTailwind);
