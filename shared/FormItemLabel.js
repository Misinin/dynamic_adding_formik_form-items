import { Form } from "antd";

const FormItemLabel = (props) => {
  const { label, required, children, errorMessage } = props;

  return (
    <Form.Item required={required} label={label}>
      {children}
      {errorMessage}
    </Form.Item>
  );
};

export default FormItemLabel;
