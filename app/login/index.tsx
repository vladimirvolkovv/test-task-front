import { useAuthSession } from "@/providers/AuthProvider";
import { ReactNode, useState } from "react";
import { Button, Text, View, TextInput, StyleSheet } from "react-native";
import { authInstance, login, register } from "@/api/endpoints";

export default function Login(): ReactNode {
  const [isLogin, setIsLogin] = useState(true);

  const { signIn } = useAuthSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  const loginHandler = async () => {
    try {
      setError(null);
      const { access_token } = await login({ email, password });
      authInstance.defaults.headers["Authorization"] = `Bearer ${access_token}`;
      signIn(access_token);
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const registerHandler = async () => {
    try {
      setError(null);
      await register({ email, password });
      setIsLogin(true);
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 20 }}>{isLogin ? "Login" : "Register"}</Text>
      <View style={styles.inputsBox}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>
      <View style={{ height: 20, marginBottom: 10 }}>
        {
          <Text
            onPress={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            style={{ color: "blue" }}
          >
            {!isLogin ? "Go to Login" : "Go to Register"}
          </Text>
        }
      </View>
      <View style={{ height: 20, marginBottom: 10 }}>
        {error && <Text style={{ color: "red" }}>{error}</Text>}
      </View>

      {isLogin ? (
        <Button title={"Login"} onPress={loginHandler} />
      ) : (
        <Button title={"Register"} onPress={registerHandler} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  inputsBox: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
});
