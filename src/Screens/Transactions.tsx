import { Box, Heading, ScrollView, VStack, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const Transactions = () => {
  return (
    <>
      <ScrollView>
        <VStack w="100%" alignSelf={"center"}>
          <Box style={styles.transaction_container}>
            <Heading color={"success.500"}>Income</Heading>
            <Text>$600</Text>
          </Box>
          <Box style={styles.transaction_container}>
            <Heading color={"error.500"}>Expense</Heading>
            <Text>$600</Text>
          </Box>
          <Box style={styles.transaction_container}>
            <Heading color={"success.500"}>Income</Heading>
            <Text>$600</Text>
          </Box>
          <Box style={styles.transaction_container}>
            <Heading color={"error.500"}>Expense</Heading>
            <Text>$600</Text>
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  transaction_container: {
    width: "90%",
    height: 75,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 40,
    display: "flex",
    padding: 20,
    alignSelf: "center",
  },
});
