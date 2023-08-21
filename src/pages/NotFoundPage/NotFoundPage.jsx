import React from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const NotFoundPage = () => {
  return (
    <div className="not-found" style={{ widows: '100%', height: '100%' }}>
      <div>
        <Link to="/" className="link-home">
          <ButtonComponent
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '320px',
              border: 'none',
              borderRadius: '4px',
            }}
            textbutton="Go homepage"
            styleTextButtton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
          ></ButtonComponent>
        </Link>
      </div>
      <img src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png" style={{ width: '100%' }} alt="not-found" />
    </div>
  );
};

export default NotFoundPage;
