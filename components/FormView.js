import { Button } from "antd";

import useFormItems, { FIELD_TYPES } from "@/utils/useFormItems";

import styles from "@/styles/Home.module.css";

const FormView = (props) => {
  const { values, handleChange, setFieldValue, removeFormItem, index } = props;

  const config = [
    {
      type: FIELD_TYPES.text,
      name: "input",
      label: "Text input",
      placeholder: "",
      value: values.input,
      required: true,
      onChange: (evt) =>
        setFieldValue(`formParts[${index}].input`, evt.target.value),
    },
    {
      type: FIELD_TYPES.number,
      name: "number",
      label: "Input number",
      placeholder: "",
      value: values.number,
      onChange: (evt) =>
        setFieldValue(`formParts[${index}].number`, evt.target.value),
    },
    // Требуется подумать над onChange
    // {
    //   type: FIELD_TYPES.select,
    //   name: "select",
    //   label: "Select",
    //   placeholder: "",
    //   value: values.select,
    //   allowClear: true,
    //   options: [
    //     { value: "value1", label: "value1" },
    //     { value: "value2", label: "value2" },
    //     { value: "value3", label: "value3" },
    //   ],
    //   onChange(fieldValue) {
    //     setFieldValue(this.name, fieldValue);
    //   },
    // },
  ];

  const { formItems } = useFormItems({ config });

  return (
    <div className={styles.formItem}>
      <div>{formItems}</div>
      <Button
        className="flex items-baseline"
        danger={true}
        onClick={() => removeFormItem(index)}
      >
        <span>Удалить</span>
      </Button>
    </div>
  );
};

export default FormView;
