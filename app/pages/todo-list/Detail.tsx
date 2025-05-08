import { Card, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import TodoForm from './Form';
import {
  createTodoByLocalStorage,
  deleteTodoByLocalStorage,
  generateId,
  getTodoById,
  updateTodoByLocalStorage,
} from '~/utils';
import TaskDetailTailwind from '~/components/TaskDetailTailwind';
import { STATUS } from '~/utils/const';

interface DetailProps {
  id: string;
  onTaskCreated?: () => void;
  onTaskUpdated?: () => void;
  onDeleteTask?: () => void;
}

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskType {
  id: string;
  title: string;
  description: string;
  status: string;
  subTasks: SubTask[];
}

const Detail = ({ id, onTaskCreated, onTaskUpdated, onDeleteTask }: DetailProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [task, setTask] = useState<TaskType | null>(null);
  const isEditingOrCreating = isEdit || id === 'create';

  const handleSubmit = (values: any) => {
    if (id === 'create') {
      const newTask = {
        ...values,
        id: generateId(),
        subTasks: [],
      };
      createTodoByLocalStorage(newTask);
      if (onTaskCreated) {
        onTaskCreated();
      }
    } else {
      const updatedTask = {
        ...task,
        ...values,
      };
      updateTodoByLocalStorage(id, updatedTask);
      setTask(updatedTask);
      setIsEdit(false);
      if (onTaskUpdated) {
        onTaskUpdated();
      }
    }
  };

  const handleStatusChange = (status: string) => {
    if (!task) return;

    const newTask = { ...task, status };
    updateTodoByLocalStorage(id, newTask);
    setTask(newTask);

    if (onTaskUpdated) {
      onTaskUpdated();
    }
  };

  const handleStartEdit = () => {
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  const handleAddSubTask = (title: string) => {
    if (!task) return;

    const newSubTask = {
      id: generateId(),
      title,
      completed: false,
    };

    const newTask = {
      ...task,
      subTasks: [...(task.subTasks || []), newSubTask],
    };

    updateTodoByLocalStorage(id, newTask);
    setTask(newTask);

    if (onTaskUpdated) {
      onTaskUpdated();
    }
  };

  const handleSubTaskToggle = (subTaskId: string, completed: boolean) => {
    if (!task) return;

    const newTask = {
      ...task,
      subTasks: (task.subTasks || []).map((subTask) =>
        subTask.id === subTaskId ? { ...subTask, completed } : subTask
      ),
    };

    updateTodoByLocalStorage(id, newTask);
    setTask(newTask);

    if (onTaskUpdated) {
      onTaskUpdated();
    }
  };

  const handleSubTaskDelete = (subTaskId: string) => {
    if (!task) return;

    const newTask = {
      ...task,
      subTasks: (task.subTasks || []).filter((subTask) => subTask.id !== subTaskId),
    };

    updateTodoByLocalStorage(id, newTask);
    setTask(newTask);

    if (onTaskUpdated) {
      onTaskUpdated();
    }
  };

  const handleEditSubTask = (subTaskId: string, title: string) => {
    if (!task) return;

    const newTask = {
      ...task,
      subTasks: (task.subTasks || []).map((subTask) => (subTask.id === subTaskId ? { ...subTask, title } : subTask)),
    };

    updateTodoByLocalStorage(id, newTask);
    setTask(newTask);

    if (onTaskUpdated) {
      onTaskUpdated();
    }
  };

  useEffect(() => {
    if (id === 'create') {
      setTask(null);
    } else {
      const existingTask = getTodoById(id);
      setTask({
        ...existingTask,
        subTasks: existingTask?.subTasks || [],
      });
    }
    setIsEdit(id === 'create');
  }, [id]);

  if (isEditingOrCreating) {
    return (
      <Card>
        <TodoForm
          id={id}
          handleSubmit={handleSubmit}
          initialValues={id === 'create' ? { status: STATUS.TODO } : task}
          onCancel={id === 'create' ? onTaskCreated : handleCancelEdit}
        />
      </Card>
    );
  }

  return (
    <TaskDetailTailwind
      title={_.get(task, 'title', '')}
      description={_.get(task, 'description', '')}
      status={_.get(task, 'status', '')}
      subTasks={_.get(task, 'subTasks', [])}
      onEdit={handleStartEdit}
      onStatusChange={handleStatusChange}
      onAddSubTask={handleAddSubTask}
      onSubTaskToggle={handleSubTaskToggle}
      onSubTaskDelete={handleSubTaskDelete}
      onEditSubTask={handleEditSubTask}
      onDeleteTask={onDeleteTask}
    />
  );
};

export default Detail;
