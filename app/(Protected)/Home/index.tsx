import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const index = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({ container: { flex: 1 } });
