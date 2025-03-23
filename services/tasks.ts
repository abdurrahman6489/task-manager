import {
  allTasksResponseType,
  createTaskResponseType,
  deleteTaskResponseType,
  singleTaskResponseType,
  updateTaskResponseType,
} from "@/Types/Task";
import {
  CREATE_SINGLE_TASK_URL,
  DELETE_SINGLE_TASK_URL,
  GET_ALL_TASKS_URL,
  GET_SINGLE_TASK_URL,
  UPDATE_SINGLE_TASK_URL,
} from "@/URLS/tasks";
import axios from "axios";

export const getAllTasks = (token: string) => {
  const url = GET_ALL_TASKS_URL;
  return axios.get<allTasksResponseType>(url, {
    headers: { authorization: token },
  });
};
export const getSingleTask = (token: string, taskId: string) => {
  const url = `${GET_SINGLE_TASK_URL}/${taskId}`;
  return axios.get<singleTaskResponseType>(url, {
    headers: { authorization: token },
  });
};
export const updateSingleTask = (token: string) => {
  const url = UPDATE_SINGLE_TASK_URL;
  return axios.put<updateTaskResponseType>(url, {
    headers: { authorization: token },
  });
};
export const deleteSingleTask = (token: string) => {
  const url = DELETE_SINGLE_TASK_URL;
  return axios.delete<deleteTaskResponseType>(url, {
    headers: { authorization: token },
  });
};
export const createSingleTask = (
  token: string,
  title: string,
  description: string
) => {
  const url = CREATE_SINGLE_TASK_URL;
  return axios.post<createTaskResponseType>(
    url,
    { title, description },
    { headers: { authorization: token } }
  );
};
