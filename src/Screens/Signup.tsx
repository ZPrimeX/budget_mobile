import React, { useState, useEffect } from "react";
import { Box, Button, Center, FormControl, Heading, Input, VStack, WarningIcon } from "native-base";
import { request } from "../utils/axios";
import { useAppDispatch, useAppSelector } from "../core/redux/hooks";
import { SignUpThunk } from "../core/redux/auth/authThunks";
import { selectAuth } from "../core/redux/auth/authSlice";

const Signup = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const [passwordShort, setPasswordShort] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function isEmail(email: string): boolean {
  //   const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //   return emailRegex.test(email);
  // }

  const checkEmail = async () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailRegex) {
      const { data } = await request.post("/user/validate", { email });

      if (data.message === "error") {
        setIsEmailTaken(true);
      } else {
        setIsEmailTaken(false);
      }
    }
  };

  useEffect(() => {
    checkEmail();
  }, [email]);

  const handlePasswordChange = (text: string) => {
    if (text.length < 8) {
      setPasswordShort(true);
    } else {
      setPassword(text);
      setPasswordShort(false);
    }
  };

  const handleSignup = () => {
    dispatch(SignUpThunk({ first_name, last_name, password, email }));
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
          Signup {auth.status}
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
          <FormControl isInvalid={isEmailTaken}>
            <FormControl.Label>Email</FormControl.Label>
            <Input autoComplete="email" value={email} onChangeText={(text) => setEmail(text.toLowerCase())} />
            <FormControl.ErrorMessage leftIcon={<WarningIcon />}>This email is taken!</FormControl.ErrorMessage>
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
