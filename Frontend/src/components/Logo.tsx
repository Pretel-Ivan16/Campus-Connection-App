export const Logo = () => {
  return (
    <div className="flex h-7 sm:h-8 md:h-9 w-7 sm:w-8 md:w-9 items-center justify-center rounded-lg bg-primary">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20"
        height="20"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="lucide lucide-graduation-cap h-4 sm:h-5 w-4 sm:w-5 text-white" 
        aria-hidden="true"
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
        <path d="M22 10v6"></path>
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
      </svg>
    </div>
  );
};
