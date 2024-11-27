import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="Articulo" options={{ headerShown: false }}/>
      <Stack.Screen name="Carrito" options={{ headerShown: false }}/>
    </Stack>
  );
}
