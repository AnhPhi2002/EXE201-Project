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
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <nav className="mb-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-4 py-4 text-sm">
                <Home className="text-gray-600" />
                <ChevronRight className="text-gray-400" />
                <span className="text-gray-600">Subjects</span>
                <ChevronRight className="text-gray-400" />
                <span className="text-gray-800 font-medium">{subject ? subject.name : 'Loading...'}</span>
              </div>
            </div>
          </nav>

          <div className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-4">{subject ? subject.name : 'Loading...'}</h1>
          </div>

          <section className="mt-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Resources</h2>
            {loading ? (
              <p className="text-gray-500">Loading resources...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource) => (
                  <div key={resource.id} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-blue-600">{resource.title}</h3>
                      <span className="text-xs font-semibold text-white py-1 px-3 rounded-full bg-purple-500">
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
                                {resource.type === 'pdf' && (
                                  <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded mr-2">PDF</span>
                                )}
                                {resource.type === 'video' && (
                                  <span className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded mr-2">Video</span>
                                )}
                                {resource.type === 'document' && (
                                  <span className="bg-yellow-100 text-yellow-600 text-sm px-2 py-1 rounded mr-2">Document</span>
                                )}
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

          <div className="border-t pt-6 mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg font-semibold mr-2">Rate this course:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => handleRating(star)} className="focus:outline-none">
                      {star <= rating ? (
                        <Star className="text-yellow-400 text-2xl" />
                      ) : (
                        <Star className="text-slate-400 text-2xl" />
                      )}
                    </button>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({rating}/5)</span>
              </div>
              <button onClick={handleLike} className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} focus:outline-none`}>
                <Heart className="text-2xl" />
                <span>{likes} Likes</span>
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-12">Comments</h3>
            <CommentSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubjectPage;
