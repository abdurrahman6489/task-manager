import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CreateTask from "@/Components/CreateTask";

type Props = {};

const index = (props: Props) => {
  return (
    <View style={styles.container}>
      <CreateTask />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, paddingVertical: 5 },
});
