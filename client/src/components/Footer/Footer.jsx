import React from 'react';

import './Footer.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <h1 className='center-content'>
        made by{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://cyber3x.github.io/'
        >
          neven lukić
        </a>
      </h1>
    </div>
  );
};

export default Footer;
