import { Col, Row, Card, Typography, Space } from 'antd';
import { Container } from '~/components/Container';

import Toolbar, { ALL_STATUS } from './toolbar';
import Detail from './Detail';
import { STATUS } from '~/utils/const';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import List from './List';
import { deleteTodoByLocalStorage, getTodosByLocalStorage } from '~/utils';
import StyledCard from '~/components/StyledCard';

export interface Task {
  id: string;
  title: string;
  status: (typeof STATUS)[keyof typeof STATUS];
  description: string;
  subTasks?: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
}

const { Title } = Typography;

const TodoList = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [todos, setTodos] = useState<Task[]>([]);

  const fetchTodos = () => {
    const data = getTodosByLocalStorage();
    setTodos(data);
    return data;
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSelectTask = (id: string) => {
    setSelectedTaskId(id);
  };

  const handleDeleteTask = (id: string) => {
    deleteTodoByLocalStorage(id);
    fetchTodos();
    setSelectedTaskId(null);
  };

  const handleSearch = (query: string) => {
    if (query) {
      const data = getTodosByLocalStorage();
      const filteredTodos = data.filter((todo: Task) => todo.title.toLowerCase().includes(query.toLowerCase()));
      setTodos(filteredTodos);
    } else {
      fetchTodos();
    }
  };

  const handleCreateTask = () => {
    setSelectedTaskId('create');
  };

  const handleTaskCreated = () => {
    const data = fetchTodos();
    setSelectedTaskId(data[data.length - 1].id);
  };

  const handleChangeStatus = (status: string) => {
    const data = getTodosByLocalStorage();
    const filteredTodos = data.filter((todo: Task) => (status === ALL_STATUS ? true : todo.status === status));
    setTodos(filteredTodos);
  };

  return (
    <Container>
      <Row gutter={16} className="h-full" style={{ minHeight: 'calc(100vh - 40px)' }}>
        <Col className="h-full" span={8} style={{ display: 'flex', flexDirection: 'column' }}>
          <Toolbar onChangeStatus={handleChangeStatus} onSearch={handleSearch} onCreateTask={handleCreateTask} />
          <div className="flex overflow-hidden">
            <List id={selectedTaskId || ''} onSelectTask={handleSelectTask} todos={[...todos].reverse()} />
          </div>
        </Col>
        <Col span={15} className="h-full" style={{ display: 'flex', flexDirection: 'column' }}>
          {!selectedTaskId ? (
            <StyledCard>
              <div className="h-full flex items-center justify-center">
                <Title level={4} className="text-center text-gray-500">
                  Select a task or create a new one
                </Title>
              </div>
            </StyledCard>
          ) : (
            <Detail
              id={selectedTaskId}
              onTaskCreated={handleTaskCreated}
              onTaskUpdated={fetchTodos}
              onDeleteTask={() => selectedTaskId && handleDeleteTask(selectedTaskId)}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
