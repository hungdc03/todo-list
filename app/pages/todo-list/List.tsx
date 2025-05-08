import React, { useEffect, useState } from 'react';
import { getTodosByLocalStorage } from '~/utils';
import { Card, Flex, Row, Space, Tag, Typography } from 'antd';
import { STATUS, STATUS_OPTIONS } from '~/utils/const';
import _ from 'lodash';
import { styled } from 'styled-components';
import StyledTag from '~/components/StyledTag';
import { CheckCircleFilled } from '@ant-design/icons';
import StyledCard from '~/components/StyledCard';
const { Title, Text } = Typography;

const STATUS_COLOR = {
  [STATUS.TODO]: 'blue',
  [STATUS.IN_PROGRESS]: 'yellow',
  [STATUS.DONE]: 'green',
};

interface ListProps {
  id: string;
  onSelectTask: (id: string) => void;
  todos: any[];
}

const CustomCard = styled(Card)<{ isActive: boolean }>`
  background: #ffffff !important;

  @media (max-width: 1023px) {
    ${({ isActive }) =>
      isActive && `border-bottom: 2px solid #000 !important; box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1) !important;`}
  }

  @media (min-width: 1024px) {
    ${({ isActive }) =>
      isActive && `border-right: 2px solid #000 !important; box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1) !important;`}
  }
`;

const List: React.FC<ListProps> = ({ id, todos, onSelectTask }) => {
  return (
    <div className="h-full w-full overflow-y-auto" style={{ padding: '4px', height: '100%' }}>
      {todos.length === 0 ? (
        <StyledCard className="h-40 flex items-center justify-center">
          <Text className="text-gray-400 text-center">No tasks</Text>
        </StyledCard>
      ) : (
        <Space direction="vertical" size="middle" style={{ display: 'flex', width: '100%' }}>
          {todos.map((todo) => (
            <CustomCard
              className="cursor-pointer"
              onClick={() => onSelectTask(todo.id)}
              key={todo.id}
              isActive={id === todo.id}
            >
              <div className="flex justify-between items-center">
                <Title level={4} ellipsis={{ tooltip: true }}>
                  {todo.title}
                </Title>
                <div className="min-w-[110px] min-h-[28px] flex items-center justify-center">
                  <StyledTag status={todo.status} className="w-full h-[28px] flex items-center justify-center">
                    <CheckCircleFilled className="mr-1" />
                    {_.capitalize(STATUS_OPTIONS.find((s) => s.value === todo.status)?.label)}
                  </StyledTag>
                </div>
              </div>
              <Text>{todo.description}</Text>
            </CustomCard>
          ))}
        </Space>
      )}
    </div>
  );
};

export default List;
