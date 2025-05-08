import React from 'react';
import { Select } from 'antd';
import { styled } from 'styled-components';

const CustomSelect = styled(Select)`
  //   border: 1px solid rgba(0, 0, 0, 0.15);
  //   border-radius: 4px;
  //   padding: 8px 12px;

  .ant-select-selector {
    border: 1px solid rgba(0, 0, 0, 0.15) !important;
    border-radius: 4px !important;
    padding: 8px 12px !important;
  }
`;
const StyledSelect = ({ options, ...props }: any) => {
  return <CustomSelect options={options} {...props} />;
};

export default StyledSelect;
