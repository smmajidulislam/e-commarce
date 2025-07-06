// src/app/products/[id]/Skeleton.jsx
const Skeleton = () => {
  return (
    <div className="min-h-screen bg-[#e0f2f1] dark:bg-[#004d40] flex justify-center items-center">
      <div className="w-full max-w-4xl p-4 animate-pulse space-y-4">
        <div className="h-8 bg-[#ffd54f] rounded w-3/4"></div>
        <div className="h-4 bg-[#4dd0e1] rounded w-full"></div>
        <div className="h-4 bg-[#4dd0e1] rounded w-full"></div>
        <div className="h-6 bg-[#a1887f] rounded w-1/3"></div>
        <div className="h-10 bg-[#ff7043] rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default Skeleton;
