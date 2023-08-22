"use client";

import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import { RJSFSchema } from "@rjsf/utils";
import { Fragment } from "react";
import { useAddUserOrganizationMutation } from "@/redux/api/apiSlice";

const schema: RJSFSchema = {
  title: "Organization Access Request",
  type: "object",
  required: ["role", "organization_id", "user_id"],
  properties: {
    role: { type: "string", title: "Role" },
    organization_id: { type: "string", title: "Organization" },
    user_id: { type: "string", title: "User" },
  },
};

const log = (type: any) => console.log.bind(console, type);
export default function AccessRequest() {
  const [addUserOrganization, { isLoading: isAddingUserOrganization }] =
    useAddUserOrganizationMutation();

  const submitHandler = async (data: any) => {
    try {
      await addUserOrganization(data.formData).unwrap();
    } catch (err) {
      log("error")(err);
    }
  };

  return (
    <Fragment>
      <h1>Organization Access Request</h1>
      <Form
        schema={schema}
        validator={validator}
        onSubmit={submitHandler}
        onError={log("errors")}
        disabled={isAddingUserOrganization}
      />
    </Fragment>
  );
}
