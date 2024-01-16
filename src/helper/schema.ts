import * as yup from "yup";

// Validation Schema
const schema = yup.object().shape({
  selectSearch: yup.string().required("Select field is required"),
  startDate: yup.date().nullable(),
  endDate: yup
    .date()
    .nullable()
    .when("startDate", (startDate: Date | null) =>
      startDate
        ? yup.date().nullable()
        : yup.date().required("At least one date is required")
    ),
  rows: yup
    .array()
    .of(
      yup.object().shape({
        select: yup.string().when(["input1", "input2"], {
          is: (input1: string, input2: string) => !input1 && !input2,
          then: yup.string().required("At least one field is required"),
          otherwise: yup.string(),
        }),
        input1: yup.string(),
        input2: yup.string(),
      })
    )
    .required(),
});

export default schema;
