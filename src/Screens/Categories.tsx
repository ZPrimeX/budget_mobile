import { Box, HStack, Heading, ScrollView, VStack } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const Categories = () => {
  return (
    <>
      <ScrollView>
        <VStack w="90%" alignSelf={"center"}>
          <HStack justifyContent="space-between">
            <Box style={styles.category_container}>
              <Heading color={"success.500"} alignSelf={"center"}>
                Income
              </Heading>
            </Box>
            <Box style={styles.category_container}>
              <Heading color={"error.500"} alignSelf={"center"}>
                Expense
              </Heading>
            </Box>
          </HStack>
          <HStack justifyContent="space-between">
            <Box style={styles.category_container}>
              <Heading color={"success.500"} alignSelf={"center"}>
                Income
              </Heading>
            </Box>
            <Box style={styles.category_container}>
              <Heading color={"error.500"} alignSelf={"center"}>
                Expense
              </Heading>
            </Box>
          </HStack>
          <HStack justifyContent="space-between">
            <Box style={styles.category_container}>
              <Heading color={"success.500"} alignSelf={"center"}>
                Income
              </Heading>
            </Box>
            <Box style={styles.category_container}>
              <Heading color={"error.500"} alignSelf={"center"}>
                Expense
              </Heading>
            </Box>
          </HStack>
        </VStack>
      </ScrollView>
    </>
  );
};

export default Categories;

const styles = StyleSheet.create({
  category_container: {
    width: "45%",
    marginLeft: 10,
    height: 75,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 40,
    display: "flex",
    padding: 20,
  },
});
