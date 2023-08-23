"use client";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import { RJSFSchema } from "@rjsf/utils";
import {
  useGetOrganizationsQuery,
  useAddUserMutation,
  useAddOrganizationMutation,
  useAddUserOrganizationMutation,
} from "@/redux/api/apiSlice";
import { OrganizationStatus, UserOrganizationRole } from "../types";

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
                      anyOf: undefined,
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

const log = (type: any) => console.log.bind(console, type);

export default function FakeUser() {
  const { data: organizations } = useGetOrganizationsQuery();
  const [addUser, { isLoading: isAddingUser }] = useAddUserMutation();
  const [addOrganization, { isLoading: isAddingOrganization }] =
    useAddOrganizationMutation();
  const [addUserOrganization, { isLoading: isAddingUserOrganization }] =
    useAddUserOrganizationMutation();

  if (!organizations) {
    return <>no organizations in app</>;
  }

  const localSchema = JSON.parse(JSON.stringify(schema));
  localSchema.dependencies.user_type.oneOf[1].dependencies.external_type.oneOf[0].properties.organization_id.anyOf =
    organizations?.results.map((org) => {
      return {
        type: "number",
        title: org.business_legal_name,
        enum: [org.id],
        value: org.id,
      };
    });

  const uiSchema = {
    organization_id: {
      "ui:widget": "select",
    },
    organization_name: {
      "ui:widget": "text",
    },
  };

  // submit handler
  const submitHandler = async (data: any) => {
    const formData = data.formData;
    const userType = formData.user_type;
    formData.user_guid =
      userType === "Internal"
        ? `idir-${Math.floor(Math.random() * 10000000)}`
        : `bceid-${Math.floor(Math.random() * 10000000)}`;

    if (userType === "Internal") {
      // for internal users, simply add the user to the user table
      try {
        await addUser(formData).unwrap();
      } catch (error) {
        log("error")(error);
      }
      return;
    }
    // brianna question for later: I don't think this fetching strategy is transactional, better options? A: later use a serializer and viewset to do this properly, e.g. https://gist.github.com/Vibhu-Agarwal/8f71bbef7072f1deea05c75abfb3c941

    // for external user, add to User table
    try {
      const userData = await addUser(formData).unwrap();
      const { id: userId } = userData;
      const isUnregisteredOrganization = !formData.organization_id;

      // if organization does not exist, add to Org table and then add to UserOrg table
      if (isUnregisteredOrganization) {
        // Dummy data for now
        const organizationFormData = {
          swrs_org_id: Math.floor(Math.random() * 10000000),
          business_legal_name: formData.organization_name,
          english_trade_name: formData.organization_name,
          french_trade_name: formData.organization_name,
          cra_business_number: Math.floor(Math.random() * 10000000).toString(),
          status: OrganizationStatus.Pending,
        };
        // first add to Org table
        const organizationData =
          await addOrganization(organizationFormData).unwrap();

        const userOrganizationFormData = {
          organization_id: organizationData.id,
          role: UserOrganizationRole.Admin,
          user_id: userId,
        };
        // then add to UserOrg table
        await addUserOrganization(userOrganizationFormData).unwrap();
        return;
      }
      // if organization already exists, add to UserOrg table
      const userOrganizationFormData = {
        role: UserOrganizationRole.Admin,
        organization_id: formData.organization_id,
        user_id: userId,
      };

      await addUserOrganization(userOrganizationFormData).unwrap();
    } catch (err) {
      log("error")(err);
    }
  };
  return (
    <>
      <h1>Create Fake User</h1>
      <Form
        uiSchema={uiSchema}
        schema={localSchema}
        validator={validator}
        onSubmit={submitHandler}
        onError={log("errors")}
        disabled={
          isAddingUser || isAddingOrganization || isAddingUserOrganization
        }
      />
    </>
  );
}
