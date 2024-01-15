import { ChangeEvent, MouseEvent } from "react";
import { stringArray } from "./types";

export const deleteStringArrayItem = (
  event: MouseEvent,
  setStringArray: (arg: stringArray[]) => void,
  stringArray: stringArray[],
  setValidStringArray: (arg: boolean) => void
): void => {
  setStringArray(
    stringArray.filter(
      (item: stringArray) => item.id !== (event.target as HTMLInputElement).id
    )
  );
  if (stringArray.length === 2) {
    setValidStringArray(false);
  }
};

export const onChangeStringArray = (
  event: any,
  stringArray: stringArray[],
  id: string
): void => {
  stringArray.map((item: stringArray) => {
    if (item.id === id) {
      item.select = event.label;
    }
    return null;
  });
};

export const onChangeInputOne = (
  event: ChangeEvent<HTMLInputElement>,
  stringArray: stringArray[]
): void => {
  stringArray.map((item: stringArray) => {
    if (item.id === event.target.id.split("_")[0]) {
      item.inputOne = event.target.value;
    }
    return null;
  });
};

export const onChangeInputTwo = (
  event: ChangeEvent<HTMLInputElement>,
  stringArray: stringArray[]
): void => {
  stringArray.map((item: stringArray) => {
    if (item.id === event.target.id.split("_")[0]) {
      item.inputTwo = event.target.value;
    }
    return null;
  });
};
