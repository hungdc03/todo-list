import { Tag } from 'antd';
import { styled } from 'styled-components';
import React from 'react';
import { STATUS } from '~/utils/const';
import _ from 'lodash';

const CustomTag = styled(Tag)`
  padding: 2px 10px;
  border-radius: 12px;
`;

const color = {
  [STATUS.TODO]: 'blue',
  [STATUS.IN_PROGRESS]: 'yellow',
  [STATUS.DONE]: 'green',
};

const StyledTag = ({ children, status, ...props }: any) => {
  return (
    <CustomTag {...props} color={_.get(color, status)}>
      {children}
    </CustomTag>
  );
};

export default StyledTag;
