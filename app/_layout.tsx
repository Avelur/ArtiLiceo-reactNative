import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="registrar" options={{ headerShown: false }}/>
      <Stack.Screen name="MainPage" options={{ headerShown: false }}/>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="[articulo]" options={{ headerShown: false }}/>
    </Stack>
  );
}
