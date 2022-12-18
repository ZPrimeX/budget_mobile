import AppDrawer from "./src/navigator/Drawer";
import { NativeBaseProvider, extendTheme } from "native-base";

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

const customTheme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <AppDrawer />
    </NativeBaseProvider>
  );
}
