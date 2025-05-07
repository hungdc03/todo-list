import React from 'react';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-[90%] h-screen mx-auto p-4 border-2 border-gray-300 rounded-md flex flex-col">{children}</div>;
};
