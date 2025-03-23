import { initialTaskList, taskListType } from "@/Types/Task";
import { useState } from "react";

export const useTaskList = () => {
  const [taskListData, setTaskListData] =
    useState<taskListType>(initialTaskList);

  const changeTaskListData = (fields: Partial<taskListType>) => {
    setTaskListData((prev) => ({ ...prev, ...fields }));
  };

  const resetTaskListData = () => setTaskListData(initialTaskList);

  const fetchTasks = () => {};

  return { taskListData, changeTaskListData, resetTaskListData };
};
