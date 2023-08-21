import { Button } from 'antd';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
const ButtonInputSearch = (props) => {
  const { size, placeholder, textbutton, bordered, backgroundColorInput = '#fff', backgroundColorButton = 'rgb(13,92,182)', colorButton = '#fff' } = props;
  return (
    <div style={{ display: 'flex', backgroundColor: '#fff' }}>
      <InputComponent size={size} placeholder={placeholder} bordered={bordered} style={{ backgroundColor: backgroundColorInput, border: 'none' }} {...props} />

      <ButtonComponent
        styleButton={{ border: !bordered && 'none', borderRadius: '0', background: backgroundColorButton, color: colorButton }}
        size={size}
        bordered={bordered}
        icon={<SearchOutlined style={{ color: colorButton }} />}
        textbutton={textbutton}
        styleTextButtton={{ color: colorButton }}
      />
    </div>
  );
};

export default ButtonInputSearch;
