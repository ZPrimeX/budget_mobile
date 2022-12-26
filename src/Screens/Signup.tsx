import React, { useEffect, useState } from "react";
import { Box, Button, Center, FormControl, Heading, Input, VStack, WarningIcon } from "native-base";
import { isEmail } from "../utils/isEmail";
import { request } from "../utils/axios";
import { useAppDispatch, useAppSelector } from "../core/redux/hooks";
import { signUpThunk } from "../core/redux/auth/authThunks";
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

  const checkEmail = async () => {
    if (isEmail(email)) {
      const { data } = await request.post("/user/validate", { email: email });

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
    setPassword(text);
    if (text.length < 8) {
      setPasswordShort(true);
    } else {
      setPasswordShort(false);
    }
  };

  const handleSignup = () => {
    dispatch(signUpThunk({ first_name, last_name, email, password }));
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
            <FormControl.ErrorMessage leftIcon={<WarningIcon />}>This email is already taken</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={passwordShort}>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" autoComplete="password" value={password} onChangeText={handlePasswordChange} />
            <FormControl.ErrorMessage leftIcon={<WarningIcon />}>
              Passowrd is too short (minimum 8 characters)
            </FormControl.ErrorMessage>
          </FormControl>
          <Button
            mt="2"
            colorScheme={passwordShort || isEmailTaken ? "blueGray" : "indigo"}
            disabled={passwordShort || isEmailTaken}
            onPress={handleSignup}
          >
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Signup;
