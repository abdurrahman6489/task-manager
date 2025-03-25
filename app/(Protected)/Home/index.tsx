import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { FAB, Text } from "react-native-paper";
import AppProgressLoader from "@/Components/Loaders/AppProgressLoader";
import { useTaskList } from "@/Hooks/useTaskList";
import ShowTask from "@/Components/ShowTask";
import { router } from "expo-router";
import AppDivider from "@/Components/AppDivider";

type Props = {};

const TaskList = (props: Props) => {
  const { taskListData, isRefreshing, onRefresh, handleAfterDelete } =
    useTaskList();

  return (
    <View style={[styles.container, { position: "relative" }]}>
      <Text variant="bodyLarge" style={{ textAlign: "center" }}>
        Your Tasks
      </Text>

      {/* loader */}
      <View style={{ height: 5, marginVertical: 10 }}>
        {taskListData.loading ? (
          <AppProgressLoader loading={taskListData.loading} />
        ) : (
          <AppDivider style={{ height: 0.5 }} />
        )}
      </View>

      {/* no task added show */}
      {!taskListData.loading && taskListData?.list?.length === 0 ? (
        <Text
          variant="bodyLarge"
          style={{ marginVertical: 8, textAlign: "center" }}
        >
          No tasks added yet...
        </Text>
      ) : null}

      {/* tasks */}
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

      {/* add task */}
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
