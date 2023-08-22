"use client";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import { RJSFSchema } from "@rjsf/utils";
import { UserOrganization } from "../types";
import { useGetNestedUserOrganizationsQuery } from "@/redux/api/apiSlice";

const log = (type: any) => console.log.bind(console, type);

const schema: RJSFSchema = {
  type: "object",
  required: ["status"],
  properties: {
    status: {
      type: "string",
      title: "Approve or Reject This User",
      enum: ["pending", "approved", "rejected"],
    },
    organization_id: {
      title: "",
      properties: {
        id: {
          type: "number",
          title:
            "Organization ID (just for demo purposes to confirm ids are only for one organization)",
        },
      },
    },
    user_id: {
      title: "User who is requesting access to their organization",
      properties: {
        first_name: {
          type: "string",
          title: "First Name",
        },
        last_name: {
          type: "string",
          title: "Last Name",
        },
      },
    },
  },
};

const uiSchema = {
  "ui:order": ["user_id", "organization_id", "status"],

  user_id: {
    "ui:readonly": true,
  },
  organization_id: {
    "ui:readonly": true,
  },
  status: {
    "ui:widget": "select",
  },
};

export default function UserApproval() {
  // this needs to be updated to endpoint created in #9
  const { data: userOrganizations } = useGetNestedUserOrganizationsQuery();
  const userOrganizationsEndpoint =
    "http://127.0.0.1:8000/nested_user_organizations/";
  const submitHandler = async (data: any) => {
    fetch(`${userOrganizationsEndpoint}${data.formData.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.formData),
    }).then((response) => {
      console.log("response", response);
      return response.json();
    });
  };

  return (
    <>
      <h1>Manage User Access</h1>
      {userOrganizations?.results.map((org: UserOrganization) => (
        <div key={org.id}>
          <h2>
            {org.user_id.first_name} {org.user_id.last_name}
          </h2>
          <Form
            uiSchema={uiSchema}
            schema={schema}
            formData={org}
            validator={validator}
            onSubmit={submitHandler}
            onError={log("errors")}
          />
        </div>
      ))}
    </>
  );
}
