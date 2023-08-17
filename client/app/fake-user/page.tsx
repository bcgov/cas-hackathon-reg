"use client";
import Button from "@button-inc/bcgov-theme/Button";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import { useEffect, useState } from "react";

const schema: RJSFSchema = {
  type: "object",
  properties: {
    fakeUser: {
      title: "Create a Fake User",
      $ref: "#/definitions/user",
    },
  },
  definitions: {
    user: {
      title: "User",
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
                "Company name that already exists in the system": {
                  type: "string",
                },
              },
            },
          ],
        },
      },
    },
  },
};

const log = (type: any) => console.log.bind(console, type);
export default function FakeUser() {
  const userEndpoint = "http://127.0.0.1:8000/users/";

  const submitHandler = (data: any) => {
    const userType = data.formData.fakeUser.user_type;
    data.formData.fakeUser.user_guid =
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
        body: JSON.stringify(data.formData.fakeUser),
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
    fetch(userEndpoint, {
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
      <h1>Create Fake User</h1>
      <Form
        schema={schema}
        validator={validator}
        onSubmit={submitHandler}
        onError={log("errors")}
      />
    </>
  );
}
