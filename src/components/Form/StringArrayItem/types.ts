import { Dispatch, SetStateAction } from "react";

export type stringArray = {
  id: string;
  inputOne: string;
  inputTwo: string;
  select: string;
};

export type StringArrayItemProps = {
  id: string;
  setStringArray: Dispatch<SetStateAction<stringArray[]>>;
  stringArray: stringArray[];
  setValidStringArray: Dispatch<SetStateAction<boolean>>;
};
