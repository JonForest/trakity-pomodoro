import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Header({ className }) {
  const history = useHistory();

  // async function logout(e) {
  //   e.preventDefault();
  //   try {
  //     await signOut();
  //     history.push('/login');
  //   } catch (err) {
  //     console.log('Failed to sign-out due to: ', err);
  //   }
  // }

  // todo: replace the menu button and close state with svgs
  // todo: review https://tailwindcss.com/course/making-the-navbar-responsive to see if I want to do this
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`${className} bg-black`}>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-white">
          <h1 className="ml-4">
            <span className="font-sans text-3xl lg:text-4xl tracking-tightest">Trakity </span>
            <span className="font-sans text-3xl lg:text-4xl tracking-tighter text-purple-300">Pomodoro</span>
          </h1>
        </div>

        <div>
          <button
            type="button"
            className="block text-gray-500 focus:text-white focus:outline-none hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'X' : 'Menu'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="px-2 pb-3">
          <Link to="/metrics" className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-purple-600">
            See metrics
          </Link>
          <button
            className="text-left w-full mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-purple-600"
            onClick={() => console.log('Logged out')}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
