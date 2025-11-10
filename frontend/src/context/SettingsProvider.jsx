import React, { useState, useEffect } from "react";
import { SettingsContext } from "./SettingsContext.js";

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    fontSize: "medium",
    fontColor: "black",
    bgColor: "#fff",
    funMode: false,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("settings"));
    if (saved) setSettings(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};
