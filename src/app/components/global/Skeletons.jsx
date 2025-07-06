const Skeletons = ({ quantity }) => {
  const skeleton = new Array(quantity).fill(null);
  return (
    <div className="flex flex-wrap justify-center gap-2 px-2 py-8">
      {skeleton.map((_, index) => (
        <div
          key={index}
          className="w-72 h-96 rounded-2xl shadow-lg animate-pulse p-4 space-y-4"
        >
          <div className="h-44 bg-gray-500 rounded-xl" />
          <div className="h-4 bg-gray-500 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-gray-500 rounded w-1/2 mx-auto" />
          <div className="h-8 bg-gray-500 rounded w-full" />
        </div>
      ))}
    </div>
  );
};

export default Skeletons;
