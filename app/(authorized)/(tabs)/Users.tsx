import { ReactNode, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getUserList } from "@/api/endpoints";
import { User } from "@/interfaces/api";

export default function Users(): ReactNode {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const users = await getUserList();

    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Text>
            {item.id} - {item.email}
          </Text>
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
}
