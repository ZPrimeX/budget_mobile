import { Avatar, Box, Button, Divider, FormControl, Heading, Input, Spinner, Text, VStack } from "native-base";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from "react-native";
import axios from "axios";
import Toast from "toastify-react-native";
import { useAppDispatch, useAppSelector } from "../core/redux/hooks";
import { selectAuth } from "../core/redux/auth/authSlice";
import { updateProfile } from "../core/redux/auth/authThunks";
import { REDUX_STATUS } from "../core/types/common.types";
import dayjs from "dayjs";

const Profile = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const [isTouched, setIsTouched] = React.useState(false);
  const [email, setEmail] = React.useState(auth.email);
  const [first_name, setFirst] = React.useState(auth.first_name);
  const [last_name, setLast] = React.useState(auth.last_name);

  const handleChange = () => {
    dispatch(updateProfile({ first_name, email, last_name }));
  };

  const [image, setImage] = React.useState<string | null>(
    `https://budget-app.nyc3.cdn.digitaloceanspaces.com/${auth.avatar}`
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
      const formData: any = new FormData();
      formData.append("file", {
        uri: result.assets[0].uri,
        type: result.assets[0].type || "image/jpg",
        name: result.assets[0].fileName || "image.jpg",
      });
      try {
        const res = await axios.post("https://budget-v2-kappa.vercel.app/api/upload", formData);
        dispatch(updateProfile({ avatar: res.data.body }));
        Toast.success("Image uploaded successfully!");
      } catch (error) {
        Toast.error("Something went wrong!");
      }
    }
  };

  return (
    <>
      <Box style={styles.avatar_container}>
        <Box alignItems={"center"}>
          <Avatar
            source={{
              uri: image ? image : "https://bit.ly/2k1H1t6",
            }}
            width="75"
            height="75"
          />
          <Text>{`${auth.first_name} ${auth.last_name}`}</Text>
          <Box display={"flex"} flexDirection={"row"}>
            <Text color={"#5048E5"}>Joined on: </Text>
            <Text>{`${dayjs(auth.createdAt || 0)}`}</Text>
          </Box>
          <Button mt={3} variant={"outline"} onPress={pickImage} colorScheme={"indigo"}>
            Upload
          </Button>
        </Box>
      </Box>
      <Box style={styles.profile_container}>
        <Box alignItems={"center"}>
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Account Info
          </Heading>
          <Text>The information below can be edited</Text>
        </Box>
        <Divider mt={3} />
        <VStack space={3} mt="2">
          <Box maxW={"70%"} marginLeft={"15%"}>
            <FormControl>
              <FormControl.Label>First Name</FormControl.Label>
              <Input value={first_name} type="text" autoComplete="name" onChangeText={(text) => setFirst(text)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Last Name</FormControl.Label>
              <Input autoComplete="name-family" value={last_name} onChangeText={(text) => setLast(text)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input autoComplete="email" value={email} onChangeText={(text) => setEmail(text.toLowerCase())} />
            </FormControl>
          </Box>
          <Divider mt={2} />
          <Button mt="1" colorScheme="indigo" onPress={handleChange} disabled={auth.status === REDUX_STATUS.pending}>
            {auth.status === REDUX_STATUS.pending ? (
              <Spinner accessibilityLabel="Loading" color="white" />
            ) : (
              "Save details"
            )}
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  avatar_container: {
    width: "95%",
    marginLeft: 10,
    height: 200,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profile_container: {
    marginLeft: 10,
    width: "95%",
    height: 350,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 40,
    display: "flex",
    justifyContent: "center",
  },
});
