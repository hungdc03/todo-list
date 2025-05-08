import { Input } from 'antd';
import { styled } from 'styled-components';

const CustomInput = styled(Input)`
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 8px 12px;
  transition: all 0.2s ease;
  background-color: white;
  color: black;

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0.5);
  }

  &:focus {
    border-color: #000;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    outline: none;
  }
`;

const StyledInput = ({ placeholder, ...props }: any) => {
  return <CustomInput placeholder={placeholder} {...props} />;
};

export default StyledInput;
