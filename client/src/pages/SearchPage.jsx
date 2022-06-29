import React from 'react';
import Form from 'react-bootstrap/Form';
import { gameAdd } from '../services/games';

const SearchPage = () => {
  return (
    <div>
      <>
        <Form.Label> Price </Form.Label>
        <Form.Range />
      </>
      <div>
        <Form.Check
          // type=hello
          // id={`default-${type}`}
          label="test"
        />
        <Form.Check
          // type=hello
          // id={`default-${type}`}
          label="test"
        />
        <Form.Check
          // type=hello
          // id={`default-${type}`}
          label="test"
        />
        <Form.Check
          // type=hello
          // id={`default-${type}`}
          label="test"
        />
      </div>
    </div>
  );
};

export default SearchPage;
