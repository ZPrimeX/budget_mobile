import { Avatar, Box, Button, Input, Text } from "native-base";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from "react-native";
import axios from "axios";
import Toast from "toastify-react-native";
import { useAppDispatch, useAppSelector } from "../core/redux/hooks";
import { selectAuth } from "../core/redux/auth/authSlice";
import { updateProfile } from "../core/redux/auth/authThunks";

const Profile = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [image, setImage] = React.useState<string | null>(auth.avatar);

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
        <Text>Account</Text>
        <Avatar
          source={{
            uri: image ? `https://budget-app.nyc3.cdn.digitaloceanspaces.com/${image}` : "https://bit.ly/2k1H1t6",
          }}
          width="100"
          height="100%"
        />
        <Text color={"#5048E5"}>Joined on: </Text>
        <Button mt={4} variant={"outline"} onPress={pickImage} colorScheme={"indigo"}>
          Upload
        </Button>
      </Box>
      <Box style={styles.profile_container}>
        <Text>Profile</Text>
        <Text>The information can be edited</Text>
        <Input>First Name</Input>
        <Input>Last Name</Input>
        <Input>Email Address</Input>
      </Box>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  avatar_container: {
    width: "100%",
    height: 100,
    borderRadius: 1,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    marginTop: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profile_container: {
    width: "100%",
    height: 300,
    borderRadius: 1,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    marginTop: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
