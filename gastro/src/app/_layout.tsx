import { Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "../contexts/authContext";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{headerShown: false}}/>
    </AuthProvider>    
  );
}