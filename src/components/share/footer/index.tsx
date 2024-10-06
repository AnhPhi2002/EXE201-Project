import React from 'react';
import FooterLeft from './FooterLeft';
import FooterCenter from './FooterCenter';
import FooterBottom from './FooterBottom';


export default function Footer() {
  return (
    <footer className="bg-[#0C163A] text-white">
      <div className="pl-40 pr-40 py-10">
        <div className="flex justify-between items-start ">
          <FooterLeft />
          <FooterCenter />
        </div>
      </div>
      <FooterBottom />
    </footer>
  );
}
