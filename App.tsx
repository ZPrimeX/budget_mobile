import { Provider as ReduxProvider } from "react-redux";
import AppDrawer from "./src/navigator/Drawer";
import { NativeBaseProvider, extendTheme } from "native-base";
import { store } from "./src/core/redux/store";

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

const customTheme = extendTheme({ config });

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider theme={customTheme}>
        <AppDrawer />
      </NativeBaseProvider>
    </ReduxProvider>
  );
}
