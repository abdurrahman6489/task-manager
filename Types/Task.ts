import { errorDataType, successDataType } from "./commonTypes";

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
