import SettingForm from "@/app/components/admin/rightside/Settings";
import SliderList from "@/app/components/admin/rightside/SliderList";

const page = () => {
  return (
    <div className="overflow-auto h-screen hide-scrollbar">
      <SettingForm />
      <SliderList />
    </div>
  );
};

export default page;
