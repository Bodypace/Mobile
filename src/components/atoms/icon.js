import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Icon({ focused, name }) {
  const iconName = focused ? `md-${name}` : `md-${name}-outline`;
  return <Ionicons name={iconName} size={20} color="black" />;
}
