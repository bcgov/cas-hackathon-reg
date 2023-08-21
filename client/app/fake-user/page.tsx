"use client";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import { useEffect, useState } from "react";

const log = (type: any) => console.log.bind(console, type);
export default function FakeUser() {
  // endpoint stuff
  const userEndpoint = "http://127.0.0.1:8000/users/";
  const userOrganizationEndpoint = "http://127.0.0.1:8000/user_organizations/";
  const organizationEndpoint = "http://127.0.0.1:8000/organizations/";
  let organizations;

  const [results, setResults] = useState([]);
  // fetch stuff for rjsf dropdown
  useEffect(() => {
    fetch(organizationEndpoint)
      .then((response) => response.json())
      .then((data) => {
        organizations = data.results;
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
              external_type: { type: "string", enum: ["Existing", "New"] },
            },
            dependencies: {
              external_type: {
                oneOf: [
                  {
                    properties: {
                      external_type: {
                        enum: ["Existing"],
                      },

                      organization_id: {
                        type: "number",
                        title:
                          "organization name that already exists in the system",
                        // enum: results,
                        anyOf: results.map((el) => {
                          return {
                            type: "number",
                            title: el.business_legal_name,
                            enum: [el.id],
                            value: el.id,
                          };
                        }),
                      },
                    },
                    required: ["organization_id"],
                  },
                  {
                    properties: {
                      external_type: {
                        enum: ["New"],
                      },

                      organization_name: {
                        type: "string",
                      },
                    },
                    required: ["organization_name"],
                  },
                ],
              },
            },
            required: [
              "user_type",
              "first_name",
              "last_name",
              "email",
              "external_type",
            ],
          },
        ],
      },
    },
  };

  const uiSchema = {
    organization_id: {
      "ui:widget": "select",
    },
    organization_name: {
      "ui:widget": "text",
    },
  };

  // submit handler
  const submitHandler = (data: any) => {
    const formData = data.formData;
    const userType = formData.user_type;
    formData.user_guid =
      userType === "Internal"
        ? `idir-${Math.floor(Math.random() * 10000000)}`
        : `bceid-${Math.floor(Math.random() * 10000000)}`;

    if (userType === "Internal") {
      // for internal users, simply add the user to the user table
      fetch(userEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
      return;
    }
    // brianna question for later: I don't think this fetching strategy is transactional, better options? A: later use a serializer and viewset to do this properly, e.g. https://gist.github.com/Vibhu-Agarwal/8f71bbef7072f1deea05c75abfb3c941

    // for external user, add to User table
    fetch(userEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        const isUnregisteredOrganization = !formData.organization_id;

        // if org does not exist
        if (isUnregisteredOrganization) {
          const organizationData = {
            organization_id: formData.organization_id,
            role: "admin",
            user_id: data.id,
          };
          // first add to Org table
          fetch(organizationEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(organizationData),
          })
            .then((response) => response.json())
            .then((data) => {
              const newUserOrganizationData = {
                organization_id: formData.organization_id,
                role: "admin",
                user_id: data.id,
              };
              // then add to UserOrg table
              fetch(userOrganizationEndpoint, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newUserOrganizationData),
              });
            });
          return;
        }
        // if org does exist, put in UserOrg table
        const existingUserOrganizationData = {
          organization_id: formData.organization_id,
          role: "admin",
          user_id: data.id,
        };
        fetch(userOrganizationEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(existingUserOrganizationData),
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
