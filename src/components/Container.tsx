'use client'


export default function Container({ children }: { children: React.ReactNode }) {
  return <div className='flex justify-center items-center h-screen'>{children}</div>;
}
