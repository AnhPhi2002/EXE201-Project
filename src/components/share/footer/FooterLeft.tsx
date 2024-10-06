import React from 'react';

export default function FooterLeft() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-purple-400 mb-4">LearnUp.com</h2>
      <div className="flex space-x-4">
        <a href="#" className="text-white hover:text-purple-400"><i className="fab fa-twitter"></i></a>
        <a href="#" className="text-white hover:text-purple-400"><i className="fab fa-linkedin-in"></i></a>
        <a href="#" className="text-white hover:text-purple-400"><i className="fab fa-facebook-f"></i></a>
      </div>
    </div>
  );
}
