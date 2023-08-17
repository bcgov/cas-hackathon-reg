"use client";

import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import { useEffect } from "react";

const schema: RJSFSchema = {
  title: "Organization Access Request",
  type: "object",
  required: ["role", "operator_id", "user_id"],
  properties: {
    role: { type: "string", title: "Role" },
    operator_id: { type: "string", title: "Operator" },
    user_id: { type: "string", title: "User" },
  },
};

const log = (type: any) => console.log.bind(console, type);
//  we will populate the form ourselves because we already know operator id and user id from fixtures. Basically, the user is just clicking a button to request
export default function AccessRequest() {
  const userOperatorEndpoint = "http://127.0.0.1:8000/user_operators/";
  const userEndpoint = `http://127.0.0.1:8000/users/${1}`;

  useEffect(() => {
    fetch(userEndpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  const submitHandler = (data: any) => {
    fetch(userOperatorEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.formData),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Organization Access Request</h1>
      <Form
        schema={schema}
        validator={validator}
        onSubmit={submitHandler}
        onError={log("errors")}
      />
    </>
  );
}
