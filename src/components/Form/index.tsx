import { Form, Button, Select, DatePicker, Input } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import schema from "../../helper/schema";
import FormData from "../../interface";
import "./styles.css";

export default function FormComponent() {
  const { Option } = Select;
  const { Item } = Form;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: { rows: [{ select: "", input1: "", input2: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);

    alert("Success");

    reset({
      selectSearch: "",
      startDate: undefined,
      endDate: undefined,
      rows: [{ select: "", input1: "", input2: "" }],
    });
  };

  return (
    <div>
      <Form onFinish={handleSubmit(onSubmit)} className="form">
        <Item
          label="Select with Search"
          validateStatus={errors.selectSearch && "error"}
          help={errors.selectSearch?.message}
        >
          <Controller
            name="selectSearch"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                placeholder="Select a value"
                onBlur={() => field.onBlur()}
              >
                <Option value="not-identified">Not Identified</Option>
                <Option value="closed">Closed</Option>
                <Option value="communicated">Communicated</Option>
                <Option value="identified">Identified</Option>
                <Option value="resolved">Resolved</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            )}
          />
        </Item>

        <Item label="Start Date" validateStatus={errors.endDate && "error"}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                format="YYYY-MM-DD"
                value={field.value ? moment(field.value) : null}
                onBlur={() => field.onBlur()}
              />
            )}
          />
        </Item>

        <Item
          label="End Date"
          validateStatus={errors.endDate && "error"}
          help={errors.endDate?.message}
        >
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                format="YYYY-MM-DD"
                value={field.value ? moment(field.value) : null}
                onBlur={() => field.onBlur()}
              />
            )}
          />
        </Item>

        {fields.map((field, index) => (
          <div key={field.id} className="containerString">
            <Item
              validateStatus={
                errors.rows && errors.rows[index]?.select && "error"
              }
            >
              <Controller
                name={`rows.${index}.select`}
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <Option value="not-identified">Not Identified</Option>
                    <Option value="closed">Closed</Option>
                    <Option value="communicated">Communicated</Option>
                    <Option value="identified">Identified</Option>
                    <Option value="resolved">Resolved</Option>
                    <Option value="cancelled">Cancelled</Option>
                  </Select>
                )}
              />
            </Item>

            <Item
              validateStatus={
                errors.rows && errors.rows[index]?.select && "error"
              }
            >
              <Controller
                name={`rows.${index}.input1`}
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Item>

            <Item
              validateStatus={
                errors.rows && errors.rows[index]?.select && "error"
              }
              help={errors.rows && errors.rows[index]?.select?.message}
            >
              <Controller
                name={`rows.${index}.input2`}
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Item>

            <Button onClick={() => remove(index)}>Delete Row</Button>
          </div>
        ))}

        <Button onClick={() => append({ select: "", input1: "", input2: "" })}>
          Add Row
        </Button>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
