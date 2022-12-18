import React from "react";
import { Box, Button, Center, FormControl, Heading, Input, VStack } from "native-base";

type Props = {};

const Signup = (props: Props) => {
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
            <Input autoComplete="name-given" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input autoComplete="name-family" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input autoComplete="email" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" autoComplete="password" />
          </FormControl>
          <Button mt="2" colorScheme="indigo">
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Signup;
