import React, { useState } from "react";
import SellerSettingSection from "./SellerSettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { Lock } from "lucide-react";

const SellerSecurity = () => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <SellerSettingSection icon={Lock} title={"Security"}>
      <ToggleSwitch
        label={"Two-Factor Authentication"}
        isOn={twoFactor}
        onToggle={() => setTwoFactor(!twoFactor)}
      />
      <div className="mt-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded 
        transition duration-200
        "
        >
          Change Password
        </button>
      </div>
    </SellerSettingSection>
  );
};

export default SellerSecurity;
