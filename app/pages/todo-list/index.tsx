import { Col, Row, Card, Typography } from 'antd';
import { Container } from '~/components/Container';

import Toolbar from './toolbar';
import Detail from './Detail';
import { STATUS } from '~/utils/const';
import { useState } from 'react';
import _ from 'lodash';
import List from './List';
export interface Task {
  title: string;
  status: (typeof STATUS)[keyof typeof STATUS];
  description: string;
}

const { Title } = Typography;

const TodoList = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [isCreate, setIsCreate] = useState(false);

  const handleCreate = () => {
    setIsCreate(true);
  };

  return (
    <Container>
      <Row className="h-full" style={{ minHeight: 'calc(100vh - 40px)' }}>
        <Col className="h-full" flex={0.5} style={{ display: 'flex', flexDirection: 'column' }}>
          <Toolbar handleCreate={handleCreate} />
          <div className="flex-1 overflow-hidden">
            <List />
          </div>
        </Col>
        <Col flex={3} offset={1} className="h-full" style={{ display: 'flex', flexDirection: 'column' }}>
          <Card className="h-full" style={{ display: 'flex', flexDirection: 'column' }}>
            {_.isEmpty(task) && !isCreate ? (
              <div className="h-full flex items-center justify-center">
                <Title level={4} className="text-center text-gray-500">
                  Chọn 1 task để xem chi tiết hoặc tạo mới task
                </Title>
              </div>
            ) : (
              <Detail task={task} />
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
