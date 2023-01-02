import { Box, Button } from "native-base";
import React from "react";
import { useAppDispatch } from "../core/redux/hooks";
import { logout } from "../core/redux/auth/authSlice";

type Props = {};

const Settings = (props: Props) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Box>
        <Button mt="2" colorScheme="indigo" onPress={() => dispatch(logout())}>
          Logout
        </Button>
      </Box>
    </>
  );
};

export default Settings;
