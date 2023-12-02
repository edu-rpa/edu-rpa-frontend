import React from 'react';

const Footer = () => {
  return (
    <div className="bottom-0 left-0 right-0 text-gray-600 py-4 text-center">
      <p className="text-[16px]">
        @ 2023, Made with <span className="text-red text-[16px]">❤️</span> by{' '}
        <a
          className="text-primary font-bold"
          href="https://github.com/edu-rpa"
          target="_blank"
          rel="noreferrer">
          EduRPA Team
        </a>{' '}
        for a better education
      </p>
    </div>
  );
};

export default Footer;
