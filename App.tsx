import { Provider as ReduxProvider } from "react-redux";
import { NativeBaseProvider, extendTheme } from "native-base";
import { store } from "./src/core/redux/store";
import ToastManage from "toastify-react-native";
import AppTab from "./src/navigator/Tab";

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

const customTheme = extendTheme({ config });

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider theme={customTheme}>
        <AppTab />
        <ToastManage />
      </NativeBaseProvider>
    </ReduxProvider>
  );
}
