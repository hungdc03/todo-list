import { Card, Typography, Form, Input, Button } from 'antd';
import React, { useState } from 'react';
import _ from 'lodash';
import TodoForm from './Form';
import { createTodoByLocalStorage } from '~/utils';
interface DetailProps {
  task: any;
  isCreate?: boolean;
}

const { Title, Text } = Typography;

const Detail = ({ task }: DetailProps) => {
  const [isEdit, setIsEdit] = useState(!!task);
  const isCreating = isEdit || _.isEmpty(task);
  const isEditing = isEdit && !_.isEmpty(task);

  const handleSubmit = (values: any) => {
    createTodoByLocalStorage(values);
  };

  if (isCreating) {
    return (
      <Card>
        <TodoForm handleSubmit={handleSubmit} />
      </Card>
    );
  }

  return (
    <Card>
      <Title level={3}>{task.title}</Title>
      <Text>{task.description}</Text>
    </Card>
  );
};

export default Detail;
