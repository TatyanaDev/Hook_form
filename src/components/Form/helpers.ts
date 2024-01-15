import { v4 as id } from "uuid";
import * as Yup from "yup";
import { stringArray } from "./StringArrayItem/types";

const schema = Yup.object()
  .shape({
    searchSelect: Yup.string().required(),
    firstDatePicker: Yup.string(),
    secondDatePicker: Yup.string(),
  })
  .test((value) => {
    if (
      value.searchSelect &&
      (value.firstDatePicker || value.secondDatePicker)
    ) {
      return true;
    } else {
      return false;
    }
  });

export const searchSelectValidation = (
  searchSelect: string,
  setValidSearchSelect: (arg: boolean) => void
): void =>
  searchSelect.length
    ? setValidSearchSelect(false)
    : setValidSearchSelect(true);

export const datePickerValidation = (
  firstDatePicker: string,
  secondDatePicker: string,
  setValidDatePickers: (arg: boolean) => void
): void =>
  firstDatePicker.length || secondDatePicker.length
    ? setValidDatePickers(false)
    : setValidDatePickers(true);

export const stringArrayValidation = (
  stringArray: stringArray[],
  setValidStringArray: (arg: boolean) => void
): boolean | undefined => {
  if (stringArray.length > 1) {
    if (
      stringArray.filter(
        (e: stringArray) =>
          e.select.length || e.inputOne.length || e.inputTwo.length
      ).length
    ) {
      setValidStringArray(false);
      return true;
    } else {
      setValidStringArray(true);
      return false;
    }
  } else if (stringArray.length === 1) {
    setValidStringArray(false);
    return true;
  }
};

export const onFinish = (
  searchSelect: string,
  setValidSearchSelect: (arg: boolean) => void,
  firstDatePicker: string,
  secondDatePicker: string,
  setValidDatePickers: (arg: boolean) => void,
  stringArray: stringArray[],
  setValidStringArray: (arg: boolean) => void,
  setMessage: (arg: boolean) => void,
  setSearchSelect: (arg: string) => void,
  setFirstDatePicker: (arg: string) => void,
  setSecondDatePicker: (arg: string) => void,
  setStringArray: (arg: stringArray[]) => void
): void => {
  searchSelectValidation(searchSelect, setValidSearchSelect);
  datePickerValidation(firstDatePicker, secondDatePicker, setValidDatePickers);
  const validStringArray = stringArrayValidation(
    stringArray,
    setValidStringArray
  );

  schema
    .isValid({ searchSelect, firstDatePicker, secondDatePicker })
    .then((valid) => {
      if (valid && validStringArray) {
        console.log({
          searchSelect,
          firstDatePicker,
          secondDatePicker,
          stringArray,
        });

        setMessage(true);
        setTimeout(() => setMessage(false), 2000);
        setSearchSelect("");
        setFirstDatePicker("");
        setSecondDatePicker("");
        setStringArray([{ id: id(), select: "", inputOne: "", inputTwo: "" }]);
      }
    });
};

export const onChangeDatePickerOne = (
  date: any,
  dateString: string,
  setFirstDatePicker: (arg: string) => void
): void => setFirstDatePicker(dateString);

export const onChangeDatePickerTwo = (
  date: any,
  dateString: string,
  setSecondDatePicker: (arg: string) => void
): void => setSecondDatePicker(dateString);

export const onChangeSearchSelect = (
  value: string,
  setSearchSelect: (arg: string) => void
): void => setSearchSelect(value);

export const addStringArrayItem = (
  setStringArray: (arg: stringArray[]) => void,
  stringArray: stringArray[]
): void =>
  setStringArray([
    ...stringArray,
    { id: id(), select: "", inputOne: "", inputTwo: "" },
  ]);
