
import imgxx from '../../../assets/images/404monkey.webp'; 
import LockKeyholeIcon from '../../../components/icons/action-icons'; // Adjusted import

const HomeReview = () => {
  return (
    <div className="">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-indigo-900">Review Subject For FU</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="flex items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-9/12 mx-auto group">
          <img src={imgxx} alt="SWP392" className="w-14 h-14 rounded-full mr-3"/>
          <div className="flex-1">  
            <h3 className="text-lg font-semibold">SWP392</h3>
          </div>
          <div className="transform transition-transform duration-300 group-hover:scale-150 group-hover:text-black">
            <LockKeyholeIcon icon='lockkeyhole' />
          </div>
        </div>
        {/* Card 2 */}
        <div className="flex items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-9/12 mx-auto group">
          <img src={imgxx} alt="SWP392" className="w-14 h-14 rounded-full mr-3"/>
          <div className="flex-1">  
            <h3 className="text-lg font-semibold">SWP392</h3>
          </div>
          <div className="transform transition-transform duration-300 group-hover:scale-150 group-hover:text-black">
            <LockKeyholeIcon icon='lockkeyhole' />
          </div>
        </div>
        {/* Card 3 */}
        <div className="flex items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-9/12 mx-auto group">
          <img src={imgxx} alt="SWP392" className="w-14 h-14 rounded-full mr-3"/>
          <div className="flex-1">  
            <h3 className="text-lg font-semibold">SWP392</h3>
          </div>
          <div className="transform transition-transform duration-300 group-hover:scale-150 group-hover:text-black">
            <LockKeyholeIcon icon='lockkeyhole' />
          </div>
        </div>
        {/* Card 4 */}
        <div className="flex items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-9/12 mx-auto group">
          <img src={imgxx} alt="SWP392" className="w-14 h-14 rounded-full mr-3"/>
          <div className="flex-1">  
            <h3 className="text-lg font-semibold">SWP392</h3>
          </div>
          <div className="transform transition-transform duration-300 group-hover:scale-150 group-hover:text-black">
            <LockKeyholeIcon icon='lockkeyhole' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeReview;
