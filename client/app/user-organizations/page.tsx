"use client";
import { Organization } from "../../../api/registration/reg/models.py";
import { useEffect, useState } from "react";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import {
  getSubmitButtonOptions,
  RJSFSchema,
  SubmitButtonProps,
} from "@rjsf/utils";
import ObjectFieldTemplate from "@/rjsf/ObjectFieldTemplate";

const log = (type: any) => console.log.bind(console, type);

export default function Organizations() {
  const organizationsEndpoint = "http://127.0.0.1:8000/organizations/";
  const userOrganizationsEndpoint = "http://127.0.0.1:8000/user_organizations/";

  const [results, setResults] = useState([]);

  useEffect(() => {
    let userOrganizations;
    fetch(userOrganizationsEndpoint)
      .then((response) => response.json())
      .then((data) => {
        userOrganizations = data.results.sort((a, b) => {
          return a.id - b.id;
        });
        log(userOrganizations);
        setResults(userOrganizations);
      });
  }, []);
  console.log("results", results);
  const schema: RJSFSchema = {
    type: "object",

    // required: ["Business Legal Name", "lastName"],
    properties: {
      status: {
        type: "string",
        title: "Approve or Reject This Request",
        enum: ["pending", "approved", "rejected"],
      },
      organization_id: {
        title: "Organization details",
        properties: {
          business_legal_name: {
            type: "string",
            title: "Business Legal Name",
          },
          english_trade_name: {
            type: "string",
            title: "English Trade Name",
          },
          french_trade_name: {
            type: "string",
            title: "French Trade Name",
          },
          cra_business_number: {
            type: "string",
            title: "CRA Business Number",
          },
          status: {
            type: "string",
            title:
              "ORG status (ultimately, won't display here, this is just temporary to show it updates to match the approve/reject)",
            enum: ["pending", "approved", "rejected"],
          },
        },
      },
      user_id: {
        title: "User who requested access on behalf of their organization",
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
    organization_id: {
      "ui:readonly": true,
    },
    user_id: {
      "ui:readonly": true,
    },
    status: {
      "ui:widget": "select",
    },
  };

  const submitHandler = (data: any) => {
    console.log("data.formData, what's being sent", data.formData);
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
      <h1>Organization List</h1>
      {results.map((org: Organization) => {
        return (
          <>
            <h2>{org.organization_id.business_legal_name}</h2>
            <Form
              uiSchema={uiSchema}
              schema={schema}
              formData={org}
              validator={validator}
              onSubmit={submitHandler}
              onError={log("errors")}
            />
          </>
        );
      })}
    </>
  );
}
