import { errorDataType, successDataType } from "./commonTypes";
import { z } from "zod";
export type taskType = {
  _id: string;
  user: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type taskListType = {
  list: taskType[];
  loading: boolean;
};

export const initialTaskList: taskListType = {
  list: [],
  loading: false,
};

export type createTaskResponseType = successDataType | errorDataType;
export type updateTaskResponseType = successDataType | errorDataType;
export type deleteTaskResponseType = successDataType | errorDataType;
export type allTasksResponseType =
  | (successDataType & { data: taskType[] })
  | errorDataType;
export type singleTaskResponseType =
  | (successDataType & { data: taskType })
  | errorDataType;

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export type createTaskType = z.infer<typeof createTaskSchema>;
export const initialTaskValues: createTaskType = {
  title: "",
  description: "",
};
