import { IoSearchOutline } from 'react-icons/io5';

export const Header = () => {
  return (
    <div>
      <div className="bg-black flex items-center justify-between py-5 px-3">
        <h1 className="text-red-500 font-extrabold text-3xl">LIVE NATION</h1>
        <div className="flex items-center space-x-5 h-full">
          <div className="border-l border-r border-white h-full flex items-center px-3">
            <IoSearchOutline className=" text-3xl text-white" />
          </div>

          <h1 className="text-white">Login/Register</h1>
        </div>
      </div>
      <div className="bg-red-500 flex items-center space-x-5 py-5 pl-3">
        <h1 className="text-white text-lg">All Concerts & Events</h1>
        <h1 className="text-white text-lg">Festivals</h1>
        <h1 className="text-white text-lg">VIP Experiences</h1>
        <h1 className="text-white text-lg">First to Know</h1>
      </div>
    </div>
  );
};
