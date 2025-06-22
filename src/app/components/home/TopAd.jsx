import Image from "next/image";
const TopAd = () => {
  return (
    <div className="w-full flex items-center justify-center mt-4 ">
      <Image
        src="/assets/top.png"
        alt="Top Ad"
        width={600}
        height={100}
        className="rounded-2xl"
      />
    </div>
  );
};

export default TopAd;
