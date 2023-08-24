"use client";

import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import { RJSFSchema } from "@rjsf/utils";
import { Fragment } from "react";
import {
  useAddUserOrganizationMutation,
  useGetOrganizationsQuery,
  useGetUsersQuery,
  useGetUsersForOrganizationsQuery,
} from "@/redux/api/apiSlice";

const schema: RJSFSchema = {
  title:
    "Organization Access Request (data prefilled from logging in with BCEID)",
  type: "object",
  required: ["role", "organization_id", "user_id"],
  properties: {
    role: {
      type: "string",
      title: "Role (this field will ultimately be hidden, it's the default)",
    },
    organization_id: { type: "number", title: "Organization" },
    user_id: {
      type: "number",
      title: "User requesting access on behalf of their organization",
    },
  },
};

const log = (type: any) => console.log.bind(console, type);
export default function AccessRequest() {
  const [addUserOrganization, { isLoading: isAddingUserOrganization }] =
    useAddUserOrganizationMutation();
  const { data: users, isLoading: isLoadingUsers } = useGetUsersForOrganizationsQuery(organization_id);
  const { data: organizations, isLoading: isLoadingOrganizations } =
    useGetOrganizationsQuery();

  const localSchema = JSON.parse(JSON.stringify(schema));
  if (!isLoadingUsers && !isLoadingOrganizations) {
    localSchema.properties.organization_id.anyOf = organizations?.results.map(
      (org) => {
        return {
          type: "number",
          title: org.business_legal_name,
          enum: [org.id],
          value: org.id,
        };
      }
    );
    localSchema.properties.user_id.anyOf = users?.results.map((user) => {
      return {
        type: "number",
        title: `${user.first_name} ${user.last_name}`,
        enum: [user.id],
        value: user.id,
      };
    });
  }
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
        readonly
        schema={localSchema}
        validator={validator}
        onSubmit={submitHandler}
        onError={log("errors")}
        disabled={isAddingUserOrganization}
        // we would have this data from the user logging in with bceid, mocking here
        formData={{ user_id: 1, organization_id: 1, role: "admin" }}
      />
    </Fragment>
  );
}
