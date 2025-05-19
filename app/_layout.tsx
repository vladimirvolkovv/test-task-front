import AuthProvider from "@/providers/AuthProvider";
import { Slot } from "expo-router";
import { ReactNode } from "react";
import { PaperProvider } from "react-native-paper";

export default function RootLayout(): ReactNode {
  return (
    <PaperProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </PaperProvider>
  );
}
