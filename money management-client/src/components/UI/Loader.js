import * as React from 'react';

export default function Loader() {

  return (
    <div className="hero h-screen bg-[#3f3f3f] relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-600"></div>
        <div className="text-white">LOADING...</div>
      </div>
  );
}
