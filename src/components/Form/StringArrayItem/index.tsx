import { Form, Input, Button, Select } from "antd";
import {
  deleteStringArrayItem,
  onChangeStringArray,
  onChangeInputOne,
  onChangeInputTwo,
} from "./helpers";
import { stringArrayValidation } from "./../helpers";
import { StringArrayItemProps } from "./types";

export default function StringArrayItem({
  id,
  setStringArray,
  stringArray,
  setValidStringArray,
}: StringArrayItemProps) {
  const { Option } = Select;

  return (
    <>
      <Form.Item name={`${id}_select`}>
        <Select
          labelInValue
          onChange={(event) => onChangeStringArray(event, stringArray, id)}
          onBlur={() => stringArrayValidation(stringArray, setValidStringArray)}
        >
          <Option value={`${id}_Not Identified`}>Not Identified</Option>
          <Option value={`${id}_Closed`}>Closed</Option>
          <Option value={`${id}_Communicated`}>Communicated</Option>
          <Option value={`${id}_Identified`}>Identified</Option>
          <Option value={`${id}_Resolved`}>Resolved</Option>
          <Option value={`${id}_Cancelled`}>Cancelled</Option>
        </Select>
      </Form.Item>

      <Form.Item name={`${id}_inputOne`}>
        <Input
          onChange={(event) => onChangeInputOne(event, stringArray)}
          onBlur={() => stringArrayValidation(stringArray, setValidStringArray)}
        />
      </Form.Item>

      <Form.Item name={`${id}_inputTwo`}>
        <Input
          onChange={(event) => onChangeInputTwo(event, stringArray)}
          onBlur={() => stringArrayValidation(stringArray, setValidStringArray)}
        />
      </Form.Item>

      <Button
        type="primary"
        danger
        onClick={(event) =>
          deleteStringArrayItem(
            event,
            setStringArray,
            stringArray,
            setValidStringArray
          )
        }
        id={id}
      >
        <span id={id}>X</span>
      </Button>
    </>
  );
}
