import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { FAB, Text } from "react-native-paper";
import AppProgressLoader from "@/Components/Loaders/AppProgressLoader";
import { useTaskList } from "@/Hooks/useTaskList";
import ShowTask from "@/Components/ShowTask";
import { router } from "expo-router";

type Props = {};

const TaskList = (props: Props) => {
  const { taskListData, isRefreshing, onRefresh, handleAfterDelete } =
    useTaskList();

  return (
    <View style={[styles.container, { position: "relative" }]}>
      <Text variant="bodyLarge" style={{ textAlign: "center" }}>
        Your Tasks
      </Text>
      <View style={{ height: 5, marginVertical: 10 }}>
        {taskListData.loading ? (
          <AppProgressLoader loading={taskListData.loading} />
        ) : null}
      </View>
      <FlatList
        data={taskListData?.list}
        keyExtractor={(item, index) => `${item._id}`}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        renderItem={({ item, index }) => (
          <ShowTask item={item} handleAfterDelete={handleAfterDelete} />
        )}
      />
      <View
        style={{ position: "absolute", bottom: 10, right: 15, width: "auto" }}
      >
        <FAB
          icon={"plus"}
          size={"medium"}
          onPress={() => router.push("/(Protected)/CreateTask")}
        />
      </View>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({ container: { flex: 1, padding: 10 } });
