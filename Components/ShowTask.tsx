import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Avatar, Card, Text } from "react-native-paper";
import { taskType } from "@/Types/Task";
import AppButton from "./AppButton";
import AppIconButton from "./AppIconButton";
import { deleteSingleTask } from "@/services/tasks";
import { useAuthContext } from "@/context/useAuth";
import { toast } from "sonner-native";
import { toastAutoHideDuration } from "@/constants";
import { Alert } from "react-native";
import AppProgressLoader from "./Loaders/AppProgressLoader";
import { router } from "expo-router";
const LeftContent = (props: { size: number }) => (
  <Avatar.Icon {...props} icon="alarm-panel" />
);

type showTaskProps = {
  item: taskType;
  handleAfterDelete: () => void;
};

const ShowTask = ({ item, handleAfterDelete }: showTaskProps) => {
  const { state } = useAuthContext();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTask = () => {
    Alert.alert("", "Are you sure you want to delete this task?", [
      { text: "No" },
      { text: "Yes", onPress: deleteTheTask },
    ]);
  };

  const deleteTheTask = async () => {
    if (!state?.token) {
      toast.error("token not found");
      return;
    }
    try {
      setIsDeleting(true);
      const { data } = await deleteSingleTask(state.token, item._id);
      if (!data.success) {
        toast.error(data.error || "task could not be deleted", {
          duration: toastAutoHideDuration,
        });
        return;
      }
      toast.success(data.message || "Task deleted successfully");
      handleAfterDelete();
    } catch (error: any) {
      console.error("task deletion error", JSON.stringify(error, null, 2));
      toast.error(error?.response?.data?.error || "task could not be deleted", {
        duration: toastAutoHideDuration,
      });
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Card>
      <Card.Title title={item.title} left={LeftContent} />
      <Card.Content>
        <Text variant="bodyMedium">{item.description}</Text>
      </Card.Content>
      <View style={{ height: 5, paddingHorizontal: 10, marginVertical: 5 }}>
        {isDeleting ? <AppProgressLoader loading={isDeleting} /> : null}
      </View>
      <Card.Actions style={{ alignSelf: "flex-start" }}>
        <AppIconButton
          icon={"pencil"}
          size={20}
          disabled={isDeleting}
          onPress={() => router.push(`/(Protected)/CreateTask?_id=${item._id}`)}
        />
        <AppIconButton
          icon="delete"
          color="red"
          size={20}
          onPress={handleDeleteTask}
          disabled={isDeleting}
        />
      </Card.Actions>
    </Card>
  );
};

export default ShowTask;

const styles = StyleSheet.create({});
