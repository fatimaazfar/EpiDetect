import React, { useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  useEffect(() => {
    const adjustFooterPosition = () => {
      const footer = document.querySelector('.footer');
      const content = document.querySelector('.content');
      if (footer && content) {
        const contentHeight = content.offsetHeight;
        const windowHeight = window.innerHeight;
        const footerHeight = footer.offsetHeight;
        if (contentHeight + footerHeight < windowHeight) {
          footer.style.position = 'fixed';
          footer.style.bottom = 0;
        } else {
          footer.style.position = 'absolute';
          footer.style.bottom = 'unset';
        }
      }
    };

    adjustFooterPosition();

    window.addEventListener('resize', adjustFooterPosition);
    window.addEventListener('scroll', adjustFooterPosition);

    return () => {
      window.removeEventListener('resize', adjustFooterPosition);
      window.removeEventListener('scroll', adjustFooterPosition);
    };
  }, []);

  return (
    <footer className="footer">
      <p>&copy; 2024 EpiDetect. All rights reserved.</p>
      <div className="footer-links">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
