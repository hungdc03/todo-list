import React from 'react';
import { styled } from 'styled-components';
import { Input } from 'antd';

const CustomTextarea = styled(Input.TextArea)`
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 8px 12px;

  &:hover {
    border-color: rgba(0, 0, 0, 0.5);
  }

  &:focus {
    border-color: #000;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    outline: none;
  }
`;

const StyledTextarea = ({ placeholder, ...props }: any) => {
  return <CustomTextarea placeholder={placeholder} {...props} />;
};

export default StyledTextarea;
