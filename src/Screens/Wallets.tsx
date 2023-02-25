import { Box, Heading, ScrollView, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const Wallets = () => {
  return (
    <>
      <ScrollView>
        <Box style={styles.wallet_container}>
          <Heading>Main</Heading>
          <Text fontSize={"xl"} padding={3}>
            Details
          </Text>
        </Box>
      </ScrollView>
    </>
  );
};

export default Wallets;

const styles = StyleSheet.create({
  wallet_container: {
    width: "95%",
    marginLeft: 10,
    height: 200,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 40,
    display: "flex",
    padding: 20,
  },
});
