import { User } from "lucide-react";
import SellerSettingSection from "./SellerSettingSection";

const SellerProfile = () => {
  return (
    <SellerSettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/3.jpg"
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />

        <div>
          <h3 className="text-lg font-semibold text-black">John Doe</h3>
          <p className="text-black">john.doe@example.com</p>
        </div>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
        Edit Profile
      </button>
    </SellerSettingSection>
  );
};
export default SellerProfile;
