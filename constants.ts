import { ColorSchemeName } from "react-native";
import { CheckboxItemProps, RadioButtonItemProps } from "react-native-paper";
export const toastAutoHideDuration = 2000;
export const appVersion = "1.0.6";

export const serverUrlsObj = {
  dev: "http://192.168.0.193:5011",
  build: "https://taskmanager-wblm.onrender.com",
};

export const appMode: keyof typeof serverUrlsObj = "build";

export const BASE_URL = serverUrlsObj[appMode];

export const checkedBoxCheckedStatus: CheckboxItemProps["status"] = "checked";
export const checkedBoxUncheckedStatus: CheckboxItemProps["status"] =
  "unchecked";
export const checkBoxIndeterminateStatus: CheckboxItemProps["status"] =
  "indeterminate";

export const radioButtonCheckedStatus: RadioButtonItemProps["status"] =
  "checked";
export const radioButtonUncheckedStatus: RadioButtonItemProps["status"] =
  "unchecked";
export const radioButtonIndeterminateStatus: CheckboxItemProps["status"] =
  "indeterminate";

export const darkMode: ColorSchemeName = "dark";
export const lightMode: ColorSchemeName = "light";

export const appModeObj = {
  dark: darkMode,
  light: lightMode,
};

export const searchByObj = {
  search: "search",
  classSec: "class-sec",
};
