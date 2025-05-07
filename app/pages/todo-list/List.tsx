import React, { useEffect, useState } from 'react';
import { getAllQueryParams, getTodosByLocalStorage } from '~/utils';
import { Card, Flex, Row, Space, Tag, Typography } from 'antd';
import { STATUS } from '~/utils/const';
import { useSearchParams, useNavigate } from 'react-router';
import _ from 'lodash';

const { Title, Text } = Typography;

const STATUS_COLOR = {
  [STATUS.TODO]: 'blue',
  [STATUS.IN_PROGRESS]: 'yellow',
  [STATUS.DONE]: 'green',
};

const List = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [search, setSearch] = useSearchParams();
  const searchValue = search.get('search');

  const onClickView = (id: string) => {
    setSearch({ ...getAllQueryParams(), id });
  };

  useEffect(() => {
    const data = getTodosByLocalStorage();
    if (searchValue) {
      const filteredTodos = data.filter((todo: any) => _.get(todo, 'title', '').includes(searchValue));
      setTodos(filteredTodos);
    } else {
      setTodos(data);
    }
  }, [search]);

  return (
    <div className="h-full overflow-y-auto" style={{ padding: '4px', height: '100%' }}>
      {todos.length === 0 ? (
        <div className="h-40 flex items-center justify-center">
          <Text className="text-gray-400 text-center">Không có công việc nào. Hãy tạo mới một công việc!</Text>
        </div>
      ) : (
        <Space direction="vertical" size="middle" style={{ display: 'flex', width: '100%' }}>
          {todos.map((todo) => (
            <Card onClick={() => onClickView(todo.id)} key={todo.id}>
              <Flex justify="space-between">
                <Title level={4} ellipsis={{ tooltip: true }}>
                  {todo.title}
                </Title>
                <Tag bordered={false} color={STATUS_COLOR[todo.status] || 'blue'}>
                  {todo.status === STATUS.TODO
                    ? 'Chưa làm'
                    : todo.status === STATUS.IN_PROGRESS
                      ? 'Đang làm'
                      : 'Hoàn thành'}
                </Tag>
              </Flex>
              <Text>{todo.description}</Text>
            </Card>
          ))}
        </Space>
      )}
    </div>
  );
};

export default List;
