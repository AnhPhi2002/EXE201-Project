import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Home, ChevronRight, Star, Heart } from 'lucide-react';
import { RootState, AppDispatch } from '@/lib/api/store';
import { fetchResourcesBySubject } from '@/lib/api/redux/resourceSlice';
import { fetchSubjectById } from '@/lib/api/redux/subjectSlice';
import CommentSection from './CommentSubject';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SubjectPage: React.FC = () => {
  const query = useQuery();
  const subjectId = query.get('id');
  const dispatch = useDispatch<AppDispatch>();

  const { resources, loading, error } = useSelector((state: RootState) => state.resources);
  const subject = useSelector((state: RootState) => state.subjects.subject);

  const [rating, setRating] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const userRole = localStorage.getItem('role') || 'member_free';

  useEffect(() => {
    if (subjectId) {
      dispatch(fetchResourcesBySubject(subjectId));
      dispatch(fetchSubjectById(subjectId));
    }
  }, [dispatch, subjectId]);

  const handleRating = (value: number) => setRating(value);
  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const canAccessResource = (allowedRoles: string[]): boolean => {
    return (
      userRole === 'admin' || 
      userRole === 'staff' || 
      userRole === 'member_premium' || 
      allowedRoles.includes(userRole)
    );
  };

  return (
    <div className=" min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className=" ">
          <nav className="mb-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-4 py-4 text-sm text-gray-600">
                <Home className="text-white" />
                <ChevronRight className="text-white" />
                <span className="text-white">Subjects</span>
                <ChevronRight className="text-white" />
                <span className="text-gray-800 font-medium">{subject ? subject.name : 'Loading...'}</span>
              </div>
            </div>
          </nav>

          <div className="mb-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-8 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-8">{subject ? subject.name : 'Loading...'}</h1>
          </div>

          <section className="mt-8 mb-12">
            <h2 className="text-3xl font-semibold text-black mb-10">Resources</h2>
            {loading ? (
              <p className="text-gray-500">Loading resources...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource) => (
                  <div key={resource.id} className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-purple-600">{resource.title}</h3>
                      <span className="text-xs font-semibold text-white py-1 px-3 rounded-full bg-pink-500">
                        {resource.type?.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-gray-500">Access:</span>
                      <span className={`text-sm font-semibold py-1 px-3 rounded-full ${resource.allowedRoles?.includes('member_premium') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {resource.allowedRoles?.join(', ')}
                      </span>
                    </div>
                    {canAccessResource(resource.allowedRoles || []) ? (
                      resource.fileUrls && resource.fileUrls.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-gray-500 mb-2">Files:</h4>
                          <ul className="space-y-1">
                            {resource.fileUrls.map((url, index) => (
                              <li key={index} className="flex items-center">
                                <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                                  {resource.type} {index + 1}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    ) : (
                      <p className="text-red-500 mt-4">Nâng cấp Premium để xem tài liệu này</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No resources available for this subject.</p>
            )}
          </section>

          <div className="border-t pt-6 mt-8 border-gray-300/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg font-semibold text-black mr-2">Rate this course:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => handleRating(star)} className="focus:outline-none">
                      {star <= rating ? (
                        <Star className="text-yellow-200 text-2xl" />
                      ) : (
                        <Star className="text-white text-2xl" />
                      )}
                    </button>
                  ))}
                </div>
                <span className="ml-2 text-black ">({rating}/5)</span>
              </div>
              <button onClick={handleLike} className={`flex items-center space-x-1 ${isLiked ? 'text-pink-500' : 'text-black '} focus:outline-none`}>
                <Heart className="text-2xl" />
                <span>{likes} Likes</span>
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-purple-700 mb-6">Comments</h3>
            <CommentSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubjectPage;
