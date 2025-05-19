import { authInstance } from "@/api/endpoints";
import { useAuthSession } from "@/providers/AuthProvider";
import { Tabs } from "expo-router";
import { ReactNode } from "react";
import { Button } from "react-native";

export default function TabLayout(): ReactNode {
  const { signOut } = useAuthSession();

  const signOutHandler = () => {
    signOut();
    authInstance.defaults.headers["Authorization"] = "";
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontWeight: "700",
          margin: 0,
          fontSize: 15,
        },
        tabBarActiveTintColor: "blue",
        tabBarStyle: {
          backgroundColor: "#DDDDDD",
        },
        tabBarActiveBackgroundColor: "#CCCCCC",
        tabBarIconStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="Users"
        options={{
          tabBarLabel: "Users",
          tabBarIcon: ({ focused, color, size }) => null,
          tabBarButton: () => (
            <Button onPress={signOutHandler} title="Sign out" />
          ),
        }}
      />
    </Tabs>
  );
}
