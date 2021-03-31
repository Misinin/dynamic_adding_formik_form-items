import { Button, Form } from "antd";

import styles from "@/styles/Home.module.css";

import FormView from "./FormView";

const DynamicForm = (props) => {
  const { values, handleSubmit, handleChange, setFieldValue } = props;

  const addFormItem = () => {
    setFieldValue("formParts", [
      ...values.formParts,
      {
        input: "",
        number: null,
        select: "",
      },
    ]);
  };

  const removeFormItem = (index) => {
    const filteredFormItems = [...values.formParts];
    filteredFormItems.splice(index, 1);
    setFieldValue("formParts", filteredFormItems);
  };

  return (
    <div className={styles.formContainer}>
      <Button onClick={addFormItem}>Добавить поля</Button>
      <Form onFinish={handleSubmit}>
        {values.formParts.map((formItem, index) => {
          return (
            <FormView
              key={index}
              values={formItem}
              removeFormItem={removeFormItem}
              index={index}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          );
        })}
      </Form>
    </div>
  );
};

export default DynamicForm;
