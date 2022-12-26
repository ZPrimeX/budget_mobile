import React from "react";
import { Box, Button, Center, FormControl, Heading, HStack, Input, Link, Text, VStack } from "native-base";
import { Link as RNLink } from "@react-navigation/native";

type Props = {};

const Login = (props: Props) => {
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
            <Input autoComplete="email" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" autoComplete="password" />
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
          <Button mt="2" colorScheme="indigo">
            Sign in
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

            <RNLink
              to={{ screen: "Signup" }}
              style={{
                color: "indigo.500",
                fontWeight: "500",
                fontSize: 14,
              }}
            >
              Sign Up
            </RNLink>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
