import { Form, Button, Select, Typography, DatePicker } from "antd";
import { useState } from "react";
import { v4 as id } from "uuid";
import moment from "moment";
import {
  searchSelectValidation,
  datePickerValidation,
  onFinish,
  onChangeDatePickerOne,
  onChangeDatePickerTwo,
  onChangeSearchSelect,
  addStringArrayItem,
} from "./helpers";
import { stringArray } from "./StringArrayItem/types";
import StringArrayItem from "./StringArrayItem";

export default function FormComponent() {
  const [stringArray, setStringArray] = useState<stringArray[]>([
    { id: id(), select: "", inputOne: "", inputTwo: "" },
  ]);
  const [validSearchSelect, setValidSearchSelect] = useState<boolean>(false);
  const [validDatePickers, setValidDatePickers] = useState<boolean>(false);
  const [validStringArray, setValidStringArray] = useState<boolean>(false);
  const [secondDatePicker, setSecondDatePicker] = useState<string>("");
  const [firstDatePicker, setFirstDatePicker] = useState<string>("");
  const [searchSelect, setSearchSelect] = useState<string>("");
  const [message, setMessage] = useState<boolean>(false);
  const { Text } = Typography;
  const { Option } = Select;

  return (
    <>
      {message && <Text type="success">Success</Text>}

      <Form
        initialValues={{ remember: true }}
        onFinish={() =>
          onFinish(
            searchSelect,
            setValidSearchSelect,
            firstDatePicker,
            secondDatePicker,
            setValidDatePickers,
            stringArray,
            setValidStringArray,
            setMessage,
            setSearchSelect,
            setFirstDatePicker,
            setSecondDatePicker,
            setStringArray
          )
        }
        autoComplete="off"
        style={{ maxWidth: 318 }}
      >
        <Select
          showSearch
          onChange={(value) => onChangeSearchSelect(value, setSearchSelect)}
          onBlur={() =>
            searchSelectValidation(searchSelect, setValidSearchSelect)
          }
          placeholder="Search to Select"
          value={searchSelect}
          style={{ display: "block" }}
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB?.children?.toLowerCase())
          }
        >
          <Option value="Not Identified">Not Identified</Option>
          <Option value="Closed">Closed</Option>
          <Option value="Communicated">Communicated</Option>
          <Option value="Identified">Identified</Option>
          <Option value="Resolved">Resolved</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
        {validSearchSelect && (
          <Text type="danger">The field must not be empty</Text>
        )}

        <DatePicker
          onChange={(date, dateString) =>
            onChangeDatePickerOne(date, dateString, setFirstDatePicker)
          }
          onBlur={() =>
            datePickerValidation(
              firstDatePicker,
              secondDatePicker,
              setValidDatePickers
            )
          }
          name="firstDatePicker"
          value={
            firstDatePicker !== ""
              ? moment(`${firstDatePicker}`, "YYYY/MM/DD")
              : undefined
          }
        />

        <DatePicker
          onChange={(date, dateString) =>
            onChangeDatePickerTwo(date, dateString, setSecondDatePicker)
          }
          onBlur={() =>
            datePickerValidation(
              firstDatePicker,
              secondDatePicker,
              setValidDatePickers
            )
          }
          name="secondDatePicker"
          value={
            secondDatePicker !== ""
              ? moment(`${secondDatePicker}`, "YYYY/MM/DD")
              : undefined
          }
        />
        {validDatePickers && (
          <Text type="danger">At least one must be non-empty</Text>
        )}

        <Button
          type="primary"
          onClick={() => addStringArrayItem(setStringArray, stringArray)}
          style={{ background: "green", borderColor: "green" }}
        >
          +
        </Button>
        {stringArray.map((obj) => (
          <StringArrayItem
            key={obj.id}
            id={obj.id}
            setStringArray={setStringArray}
            stringArray={stringArray}
            setValidStringArray={setValidStringArray}
          />
        ))}
        {validStringArray && (
          <Text type="danger">
            More than one line. One field must be filled
          </Text>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
