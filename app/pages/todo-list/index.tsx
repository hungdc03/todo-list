import { Col, Row } from 'antd';
import { Container } from '~/components/Container';

const TodoList = () => {
  return (
    <Container>
      <Row>
        <Col flex={2}>
          <h1>Todo List</h1>
        </Col>  
        <Col flex={3}>
        <h1>Todo List</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
