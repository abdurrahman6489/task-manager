import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "react-native-paper";
import {
  createTaskSchema,
  createTaskType,
  initialTaskValues,
} from "@/Types/Task";
import { useColors } from "@/config/useColors";
import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";
import {
  createSingleTask,
  getSingleTask,
  updateSingleTask,
} from "@/services/tasks";
import { useAuthContext } from "@/context/useAuth";
import { toast } from "sonner-native";
import { toastAutoHideDuration } from "@/constants";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import AppProgressLoader from "./Loaders/AppProgressLoader";
import AppDivider from "./AppDivider";
type Props = {};

const CreateTask = (props: Props) => {
  const { state } = useAuthContext();

  const { darkModeColor, lightModeColor, dangerColor } = useColors();

  const { _id } = useLocalSearchParams<{ _id: string }>();

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [taskValues, setTaskValues] =
    useState<createTaskType>(initialTaskValues);

  const isEditing = !!_id;

  const editingBtnText = loading ? "Updating Task" : "Update Task";
  const creatingBtnText = loading ? "Creating Task" : "Create";
  const btnText = loadingData
    ? "Getting Data"
    : isEditing
    ? editingBtnText
    : creatingBtnText;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<createTaskType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: taskValues.title,
      description: taskValues.description,
    },
  });

  const createTask = async (taskData: createTaskType) => {
    if (!state?.token) {
      toast.error("Token not found", { duration: toastAutoHideDuration });
      return;
    }
    const isEditing = !!_id;
    try {
      setLoading(true);
      const { data } = !isEditing
        ? await createSingleTask(
            state?.token,
            taskData.title,
            taskData.description
          )
        : await updateSingleTask(
            state?.token,
            _id,
            taskData.title,
            taskData.description
          );
      if (!data.success) {
        const defaultMsg = `Something went wrong, Could not ${
          isEditing ? "update" : "Something went wrong, Could not create task"
        } task`;
        toast.error(data?.error || defaultMsg, {
          duration: toastAutoHideDuration,
        });
        return;
      }
      const defaultMsg = `Task ${
        isEditing ? "updated" : "created"
      } successfully`;
      toast.success(data?.message || defaultMsg, {
        duration: toastAutoHideDuration,
      });
      router.push("/(Protected)/Home");
    } catch (error: any) {
      console.error("create task error", error);
      const defaultMsg = `Something went wrong, Could not ${
        isEditing ? "update" : "create"
      } task`;
      toast.error(error?.response?.data?.error || defaultMsg, {
        duration: toastAutoHideDuration,
      });
    } finally {
      setLoading(false);
    }
  };

  const getSingleTaskData = async (id: string) => {
    if (!state?.token) {
      toast.error("Token not found", { duration: toastAutoHideDuration });
      return;
    }
    try {
      setLoadingData(true);
      const { data } = await getSingleTask(state?.token, id);
      if (!data.success) {
        toast.error(data?.error || "Could not load the task data");
        setTaskValues(initialTaskValues);
        return;
      }
      setTaskValues({
        description: data?.data?.description,
        title: data?.data?.title,
      });
      setValue("title", data?.data?.title);
      setValue("description", data?.data?.description);
    } catch (error: any) {
      console.error("get single task data error", error);
      toast.error(
        error?.response?.data?.error || "Could not load the task data"
      );
      setTaskValues(initialTaskValues);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!_id) return;
    getSingleTaskData(_id);
  }, [_id]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="always"
    >
      <Text variant="bodyLarge" style={{ textAlign: "center" }}>
        {isEditing ? "Update Task" : "Create Task"}
      </Text>
      <View style={{ height: 10 }}>
        {loadingData ? (
          <AppProgressLoader loading={loadingData} />
        ) : (
          <AppDivider />
        )}
      </View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextInput
            placeholder="Enter Task title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{ backgroundColor: lightModeColor }}
            textColor={darkModeColor}
            label={`Task Title`}
            keyboardType="default"
            disabled={loadingData}
          />
        )}
        name="title"
      />
      <View style={{ minHeight: 10, marginBottom: 5 }}>
        {errors.title && (
          <Text style={{ color: dangerColor }}>{errors.title?.message}</Text>
        )}
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextInput
            placeholder="Enter task description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{ backgroundColor: lightModeColor, minHeight: 150 }}
            textColor={darkModeColor}
            label={`Task Description`}
            keyboardType="default"
            multiline={true}
            numberOfLines={5}
            disabled={loadingData}
          />
        )}
        name="description"
      />
      <View style={{ minHeight: 10, marginBottom: 5 }}>
        {errors.description && (
          <Text style={{ color: dangerColor }}>
            {errors?.description?.message}
          </Text>
        )}
      </View>
      <View style={{ flexGrow: 1 }} />
      <AppButton
        onPress={handleSubmit(createTask)}
        loading={loading}
        disabled={loading || loadingData}
        style={{
          marginTop: "auto",
          justifyContent: "center",
          marginHorizontal: "auto",
        }}
      >
        {btnText}
      </AppButton>
    </ScrollView>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  btn: {
    justifyContent: "center",
    marginHorizontal: "auto",
  },
});
