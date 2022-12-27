import React, { useState, useEffect } from "react";
import { Box, Button, Center, FormControl, Heading, Input, VStack, WarningIcon } from "native-base";
import { request } from "../utils/axios";
import { useAppDispatch, useAppSelector } from "../core/redux/hooks";
import { selectAuth } from "../core/redux/auth/authSlice";
import { signupThunk } from "../core/redux/auth/authThunks";
import { setData } from "../utils/asyncStorage";

const Signup = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const [emailWrong, setEmailWrong] = useState(true);
  const [passwordShort, setPasswordShort] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function isEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  }

  const checkEmail = async () => {
    if (isEmail(email)) {
      const { data } = await request.post("/user/validate", { email });

      if (data.message === "error") {
        setIsEmailTaken(true);
      } else {
        setIsEmailTaken(false);
      }
    }
  };

  useEffect(() => {
    if (email.length > 3) {
      checkEmail();
    }
  }, [email]);

  const handlePasswordChange = (text: string) => {
    if (text.length < 8) {
      setPasswordShort(true);
    } else {
      setPassword(text);
      setPasswordShort(false);
    }
  };

  const handleSignup = async () => {
    const res: any = await dispatch(signupThunk({ first_name, last_name, password, email }));
    if (res.meta.requestStatus === "fulfilled") {
      await setData("token", res.payload.body.token);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text.toLowerCase());
    if (!isEmail(email)) {
      setEmailWrong(true);
    } else {
      setEmailWrong(false);
    }
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Signup
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>First Name</FormControl.Label>
            <Input autoComplete="name-given" value={first_name} onChangeText={(text) => setFirstName(text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input autoComplete="name-family" value={last_name} onChangeText={(text) => setLastName(text)} />
          </FormControl>
          <FormControl isInvalid={isEmailTaken || emailWrong}>
            <FormControl.Label>Email</FormControl.Label>
            <Input autoComplete="email" value={email} onChangeText={handleEmailChange} />
            <FormControl.ErrorMessage leftIcon={<WarningIcon />}>
              {isEmailTaken ? "This email is taken!" : "Email is invalid!"}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={passwordShort}>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" autoComplete="password" onChangeText={handlePasswordChange} />
            <FormControl.ErrorMessage leftIcon={<WarningIcon />}>Password is too short!</FormControl.ErrorMessage>
          </FormControl>
          <Button mt="2" colorScheme="indigo" disabled={passwordShort || isEmailTaken} onPress={handleSignup}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Signup;
