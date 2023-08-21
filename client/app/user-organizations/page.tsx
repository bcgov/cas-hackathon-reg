"use client";
import { Organization } from "../../../api/registration/reg/models.py";
import { useEffect, useState } from "react";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
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
        title: "status",
        enum: ["pending", "approved", "denied"],
      },
      organization_id: {
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
          // status: {
          //   type: "string",
          //   title: "status",
          //   enum: ["pending", "approved", "denied"],
          // },
        },
      },
      user_id: {
        properties: {
          first_name: {
            type: "string",
            title: "User",
          },
          last_name: {
            type: "string",
            title: "User",
          },
        },
      },
    },
  };

  const uiSchema = {
    business_legal_name: {
      "ui:readonly": true,
    },
    english_trade_name: {
      "ui:readonly": true,
    },
    french_trade_name: {
      "ui:readonly": true,
    },
    cra_business_number: {
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
    console.log("data.formData", data.formData);
    fetch(`${userOrganizationsEndpoint}${data.formData.organization_id.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.formData),
    }).then((response) => response.json());
  };

  return (
    <>
      <h1>Organization List</h1>
      {results.map((org: Organization) => {
        return (
          <>
            <h2>{org.business_legal_name}</h2>
            <Form
              uiSchema={uiSchema}
              schema={schema}
              formData={org}
              validator={validator}
              onSubmit={submitHandler}
              onError={log("errors")}
              // templates={{ ObjectFieldTemplate }}
            />
          </>
        );
      })}
    </>
  );
}
