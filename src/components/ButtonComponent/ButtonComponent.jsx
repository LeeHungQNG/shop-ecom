import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({ size, styleButton, styleTextButtton, disabled, textbutton, ...rests }) => {
  return (
    <Button
      style={{
        ...styleButton,
        background: disabled ? '#ccc' : styleButton.background,
      }}
      size={size}
      {...rests}
    >
      <span style={styleTextButtton}>{textbutton}</span>
    </Button>
  );
};

export default ButtonComponent;
