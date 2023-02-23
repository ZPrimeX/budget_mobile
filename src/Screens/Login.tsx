import React, { useState } from "react";
import { Box, Button, Center, FormControl, Heading, HStack, Input, Link, Spinner, Text, VStack } from "native-base";
import { useAppDispatch, useAppSelector } from "../core/redux/hooks";
import { login } from "../core/redux/auth/authThunks";
import { selectAuth } from "../core/redux/auth/authSlice";
import { REDUX_STATUS } from "../core/types/common.types";
import { setAsyncStorage } from "../utils/asyncStorage";

const Login = ({ navigation: { navigate } }: any) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAppSelector(selectAuth);

  const handleLogin = async () => {
    const res: any = await dispatch(login({ password, email }));
    await setAsyncStorage("token", res.payload?.body.token);
    if (res.payload?.message === "success") {
      navigate("Dashboard");
    }
  };
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Login
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input autoComplete="email" value={email} onChangeText={(text) => setEmail(text.toLowerCase())} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={password}
              type="password"
              autoComplete="password"
              onChangeText={(text) => setPassword(text)}
            />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forgot Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleLogin} disabled={auth.status === REDUX_STATUS.pending}>
            {auth.status === REDUX_STATUS.pending ? <Spinner accessibilityLabel="Loading" color="white" /> : "Login"}
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              href="#"
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
