"use client";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import { RJSFSchema } from "@rjsf/utils";
import { UserOrganization } from "../types";
import {
  useGetManageUsersQuery,
  useUpdateManageUsersMutation,
} from "@/redux/api/apiSlice";
import { MOCK_ORGANIZATION_ID } from "@/constants/mockUser";

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

export default function ManageUserAccess() {
  const { data: userOrganizations } = useGetManageUsersQuery();
  const [updateManageUsers, { isLoading: isUpdatingManageUsers }] =
    useUpdateManageUsersMutation();

  const manageUsersEndpoint = "http://127.0.0.1:8000/manage_users/";

  const submitHandler = async (data: any) => {
    fetch(`${manageUsersEndpoint}${MOCK_ORGANIZATION_ID}/`, {
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
      {(!userOrganizations || userOrganizations.results.length) === 0 && (
        <>no users have requested access to this organization</>
      )}
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
