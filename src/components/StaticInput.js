import React from 'react';

import Input from './Input';

const StaticInput = props => (
  <Input
    {...props}
    type="text"
    plaintext
  />
);

StaticInput.propTypes = {
  ...Input.propTypes
};

StaticInput.defaultProps = {
  ...Input.defaultProps
};

export default StaticInput;
