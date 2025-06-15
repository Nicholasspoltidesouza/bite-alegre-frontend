import React from 'react';
import { User } from 'lucide-react';

const UserIconPlaceholder = ({ size = 20, iconColor = "text-white", bgColor = "bg-orange-300", circleSize = "w-10 h-10" }) => (
  <div className={`${circleSize} ${bgColor} rounded-full flex items-center justify-center`}>
    <User size={size} className={iconColor} />
  </div>
);

export default UserIconPlaceholder;