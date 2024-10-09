import React from 'react';
import imglecturers from '../../assets/images/404monkey.webp';
import { BreadcrumbSubject } from './BreadcrumbSubject';
import { SubjectTitle } from './SubjectTitle';
import { SubjectContent } from './SubjectContent';
import { SubjectLecturers } from './SubjectLecturers';
export const SubjectPage = () => {
  return (
    <div className="container mx-auto px-[10%]">
      <BreadcrumbSubject />
      <div className="flex flex-col md:flex-row">
        <SubjectTitle />
      <div>
      <SubjectContent />
      </div>
        <div className="md:w-3/4">
     
          <SubjectLecturers />
        </div>
      </div>
    </div>
  );
};
