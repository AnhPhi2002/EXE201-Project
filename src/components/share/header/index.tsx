import React from 'react';
import Logo from './Logo';
import NavLink from './NavLink';

const Header: React.FC = () => {
  return (
    <div className="bg-white py-3 shadow-md border-b border-gray-300 sticky top-0 z-50"> {/* z-50 để đảm bảo header luôn ở trên */}
      <div className="container mx-auto flex items-center justify-between px-0">
        {/* Logo aligned to the left */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Navigation Links aligned to the right */}
        <div className="ml-1">
          <NavLink />
        </div>
      </div>
    </div>
  );
};

export default Header;
