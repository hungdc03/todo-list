import React from 'react';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-[80%] h-screen mx-auto p-4  rounded-md flex flex-col">{children}</div>;
};
