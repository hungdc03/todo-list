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
  const [search, setSearch] = useState<string>('');
  const [filterByStatus, setFilterByStatus] = useState<string>(ALL_STATUS);
  const fetchTodos = () => {
    const data = getTodosByLocalStorage();
    let filteredData = [...data];

    if (filterByStatus !== ALL_STATUS) {
      filteredData = filteredData.filter((todo: Task) => todo.status === filterByStatus);
    }

    if (search) {
      filteredData = filteredData.filter((todo: Task) => todo.title.toLowerCase().includes(search.toLowerCase()));
    }

    setTodos(filteredData);
    return data;
  };

  useEffect(() => {
    fetchTodos();
  }, [search, filterByStatus]);

  const handleSelectTask = (id: string) => {
    setSelectedTaskId(id);
  };

  const handleDeleteTask = (id: string) => {
    deleteTodoByLocalStorage(id);
    fetchTodos();
    setSelectedTaskId(null);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const handleCreateTask = () => {
    setSelectedTaskId('create');
  };

  const handleTaskCreated = () => {
    const data = fetchTodos();
    setSelectedTaskId(data[data.length - 1].id);
  };

  const handleChangeStatus = (status: string) => {
    setFilterByStatus(status);
  };

  return (
    <Container>
      <Row gutter={16} className="h-full">
        <Col className="lg:h-full" xs={24} lg={8} style={{ display: 'flex', flexDirection: 'column' }}>
          <Toolbar onChangeStatus={handleChangeStatus} onSearch={handleSearch} onCreateTask={handleCreateTask} />
          <div className="flex overflow-hidden">
            <List id={selectedTaskId || ''} onSelectTask={handleSelectTask} todos={[...todos].reverse()} />
          </div>
        </Col>
        <Col xs={24} lg={15} className="h-full mt-3 lg:mt-0" style={{ display: 'flex', flexDirection: 'column' }}>
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
