import React, { FC } from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="hero has-text-centered is-dark is-bold mb-5">
      <div className="hero-body">
        <div className="container">
          <h2 className="title mb-3">{title}</h2>
          <h6 className="subtitle mt-0">{subtitle}</h6>
        </div>
      </div>
    </header>
  );
}

export default Header;