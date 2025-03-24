import { toastAutoHideDuration } from "@/constants";
import { useAuthContext } from "@/context/useAuth";
import { getAllTasks } from "@/services/tasks";
import { initialTaskList, taskListType } from "@/Types/Task";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { toast } from "sonner-native";
import { useHandleUnauthorized } from "./useHandleUnauthorized";
export const useTaskList = () => {
  const isFocussed = useIsFocused();
  const { handleUnAuthorized } = useHandleUnauthorized();
  const { state } = useAuthContext();

  const [taskListData, setTaskListData] =
    useState<taskListType>(initialTaskList);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const changeTaskListData = (fields: Partial<taskListType>) => {
    setTaskListData((prev) => ({ ...prev, ...fields }));
  };

  const resetTaskListData = () => setTaskListData(initialTaskList);

  const fetchTasks = async (token: string) => {
    try {
      changeTaskListData({ loading: true });
      const { data } = await getAllTasks(token);
      if (!data.success) {
        resetTaskListData();
        toast.error(data?.error || "Unable to get tasks", {
          duration: toastAutoHideDuration,
        });
        return;
      }
      changeTaskListData({ list: data?.data });
      toast.success(data?.message || "Received all tasks", {
        duration: toastAutoHideDuration,
      });
    } catch (error: any) {
      console.error("fetch tasks list error", JSON.stringify(error, null, 2));
      resetTaskListData();
      toast.error(error?.response?.data?.error || "Unable to get tasks", {
        duration: toastAutoHideDuration,
      });
      handleUnAuthorized(error);
    } finally {
      changeTaskListData({ loading: false });
    }
  };

  const onRefresh = async () => {
    if (!state?.token) {
      toast.error("Token not found");
      return;
    }
    setIsRefreshing(true);
    await fetchTasks(state.token);
    setIsRefreshing(false);
  };

  const handleAfterDelete = () => {
    if (!state?.token) {
      toast.error("Token not found");
      return;
    }
    fetchTasks(state?.token);
  };

  useEffect(() => {
    if (!isFocussed || !state?.token) return;
    fetchTasks(state?.token);
  }, [state?.token, isFocussed]);

  return {
    taskListData,
    isRefreshing,
    handleAfterDelete,
    changeTaskListData,
    resetTaskListData,
    onRefresh,
  };
};
