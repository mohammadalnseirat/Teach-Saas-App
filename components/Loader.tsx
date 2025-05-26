const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-t-2 border-t-green-500 border-b-2 border-b-blue-500 rounded-full animate-spin " />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
