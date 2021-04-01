import Head from "next/head";
import { Form, Button } from "antd";
import { useFormik } from "formik";

import DynamicForm from "@/components/DynamicForm";

import styles from "@/styles/Home.module.css";

export default function Home() {
  const submitForm = (values) => {
    console.log(values);
  };

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      formParts: [
        {
          input: "text input",
          number: 42,
          select: "value1",
        },
      ],
    },
    onSubmit: submitForm,
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Configured formik form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Configured formik form</h1>
        <div className={styles.form}>
          <Form name="dynamic">
            <DynamicForm
              values={values}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
            />
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
