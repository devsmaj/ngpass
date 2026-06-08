import { Stack } from "expo-router";
import { LoadingProvider } from "../components/LoadingOverlay";

export default function RootLayout() {
 return (
  <LoadingProvider>
   <Stack screenOptions={{headerShown:false}} />
  </LoadingProvider>
 );
}
