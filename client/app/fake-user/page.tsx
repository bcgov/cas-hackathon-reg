"use client";
import Button from "@button-inc/bcgov-theme/Button";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import { useEffect, useState } from "react";

const log = (type: any) => console.log.bind(console, type);
export default function FakeUser() {
  // endpoint stuff
  const userEndpoint = "http://127.0.0.1:8000/users/";
  const userOrganizationEndpoint = "http://127.0.0.1:8000/user_organizations/";
  const organizationsEndpoint = "http://127.0.0.1:8000/organizations/";
  let organizations;

  const [results, setResults] = useState([]);
  // fetch stuff for rjsf dropdown
  useEffect(() => {
    fetch(organizationsEndpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        organizations = data.results;
        // organizations = data.results.map(
        //   (el) => `${el.id} - ${el.business_legal_name}`
        // ) as [];
        console.log("organizations", organizations);
        setResults(organizations);
      });
  }, []);

  // rjsf stuff
  const schema: RJSFSchema = {
    type: "object",

    properties: {
      user_type: {
        type: "string",
        enum: ["Internal", "External"],
      },
    },
    required: ["user_type"],
    dependencies: {
      user_type: {
        oneOf: [
          {
            properties: {
              user_type: {
                enum: ["Internal"],
              },
              first_name: {
                type: "string",
              },
              last_name: {
                type: "string",
              },
              email: {
                type: "string",
              },
            },
            required: ["user_type", "first_name", "last_name", "email"],
          },
          {
            properties: {
              user_type: {
                enum: ["External"],
              },
              first_name: {
                type: "string",
              },
              last_name: {
                type: "string",
              },
              email: {
                type: "string",
              },
              // brianna will need to handle second external option
              organization_id: {
                type: "number",
                title: "organization name that already exists in the system",
                // enum: results,
              },
            },
            required: ["user_type", "first_name", "last_name", "email"],
          },
        ],
      },
    },
  };

  schema.dependencies.user_type.oneOf[1].properties.organization_id = {
    ...schema.dependencies.user_type.oneOf[1].properties.organization_id,
    anyOf: results.map((el) => {
      console.log("el", el);
      return {
        type: "number",
        title: el.business_legal_name,
        enum: [el.id],
        value: el.id,
      };
    }),
  };

  const uiSchema = {
    organization_id: {
      "ui:widget": "select",
    },
  };

  // submit handler
  const submitHandler = (data: any) => {
    const userType = data.formData.user_type;
    data.formData.user_guid =
      userType === "Internal"
        ? `idir-${Math.floor(Math.random() * 10)}`
        : `bceid-${Math.floor(Math.random() * 10)}`;

    if (userType === "Internal") {
      // for internal users, simply add the user to the user table
      fetch(userEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.formData),
      })
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
      return;
    }
    // for external user, if the org is already registered, add to User & UserOrg tables
    // brianna to do
    // if not already registered, add to User, Org, and UserOrg tables

    const formData = data.formData;
    fetch(userEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("formData", formData);
        const userOrganizationData = {
          organization_id: formData.organization_id,
          role: "admin",
          user_id: data.id,
        };
        fetch(userOrganizationEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userOrganizationData),
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Create Fake User</h1>
      <Form
        uiSchema={uiSchema}
        schema={schema}
        validator={validator}
        onSubmit={submitHandler}
        onError={log("errors")}
      />
    </>
  );
}
