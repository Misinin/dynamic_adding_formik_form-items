import { Input, Select } from "antd";

import FormItemLabel from "@/shared/FormItemLabel";
import styles from "@/styles/Home.module.css";

const { Option } = Select;

export const FIELD_TYPES = {
  text: "text",
  number: "number",
  select: "select",
  range: "range",
};

const getSelectOptions = (options) => {
  return options.length
    ? options.map((option, index) => {
        return (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        );
      })
    : null;
};

const getErrorMessage = ({ itemConfig, errors, touched }) => {
  if (itemConfig.type === FIELD_TYPES.range) {
    return <>
      {touched[itemConfig.min.name] && errors[itemConfig.min.name]}
      {touched[itemConfig.max.name] && errors[itemConfig.max.name]}
    </>;
  }
  return <div>{touched[itemConfig.name] && errors[itemConfig.name]}</div>;
};

const useFormItems = ({ config = [], errors = {}, touched = {} }) => {
  const formItems = config.map((itemConfig, index) => {
    const errorMessage = getErrorMessage({
      itemConfig,
      errors,
      touched,
    });

    switch (itemConfig.type) {
      case FIELD_TYPES.text:
        return (
          <FormItemLabel
            key={itemConfig.name}
            {...itemConfig}
            errorMessage={errorMessage}
          >
            <Input
              name={itemConfig.name}
              value={itemConfig.value}
              onChange={itemConfig.onChange}
            />
          </FormItemLabel>
        );

      case FIELD_TYPES.number:
        return (
          <FormItemLabel
            key={itemConfig.name}
            {...itemConfig}
            errorMessage={errorMessage}
          >
            <Input
              type="number"
              name={itemConfig.name}
              value={itemConfig.value}
              onChange={itemConfig.onChange}
            />
          </FormItemLabel>
        );

      case FIELD_TYPES.select:
        return (
          <FormItemLabel
            key={itemConfig.name}
            {...itemConfig}
            errorMessage={errorMessage}
          >
            <Select
              disabled={itemConfig.disabled}
              name={itemConfig.name}
              loading={itemConfig.loading === true}
              value={itemConfig.value}
              onChange={itemConfig.onChange.bind(itemConfig)}
              placeholder={itemConfig.placeholder}
              allowClear={itemConfig.allowClear}
            >
              {getSelectOptions(itemConfig.options)}
            </Select>
          </FormItemLabel>
        );

      case FIELD_TYPES.range:
        return (
          <FormItemLabel
            key={`${itemConfig.name}${index}`}
            {...itemConfig}
            errorMessage={errorMessage}
          >
            <div className={styles.rangeItem}>
              <Input
                name={itemConfig.min.name}
                value={itemConfig.min.value}
                className={styles.rangeMinItem}
                type="number"
                onChange={itemConfig.min.onChange}
                placeholder="от"
              />
              <div>
                <span className={styles.rangeSeparatorItem}>—</span>
              </div>
              <Input
                key={`${itemConfig.name}${index + 1}`}
                name={itemConfig.max.name}
                min={itemConfig.max.minValue}
                value={itemConfig.max.value}
                className={styles.rangeMaxItem}
                type="number"
                onChange={itemConfig.max.onChange}
                placeholder="до"
              />
            </div>
          </FormItemLabel>
        );

      case FIELD_TYPES.gap: // only grid template
        return <div className={styles.gapFormItem} key={index}></div>;

      default:
        return null;
    }
  });

  return { formItems };
};

export default useFormItems;
