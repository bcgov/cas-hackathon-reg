import {
  UsersResponse,
  OrganizationsResponse,
  User,
  Organization,
  UserOrganizationsResponse,
  UserOrganization,
} from "@/app/types";
import {
  BASE_URL,
  NESTED_USER_ORGANIZATIONS_ENDPOINT,
  ORGANIZATIONS_ENDPOINT,
  USERS_ENDPOINT,
  USER_ORGANIZATIONS_ENDPOINT,
  MANAGE_USERS_ENDPOINT,
} from "@/constants/apiEndpoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Users", "Organizations", "UserOrganizations"],
  endpoints: (builder) => ({
    // User endpoints
    getUsers: builder.query<UsersResponse, void>({
      query: () => USERS_ENDPOINT,
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: USERS_ENDPOINT,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    // Organization endpoints
    getOrganizations: builder.query<OrganizationsResponse, void>({
      query: () => ORGANIZATIONS_ENDPOINT,
    }),
    addOrganization: builder.mutation<Organization, Partial<Organization>>({
      query: (body) => ({
        url: ORGANIZATIONS_ENDPOINT,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Organizations", id: "LIST" }],
    }),
    // UserOrganization endpoints
    getUserOrganizations: builder.query<UserOrganizationsResponse, void>({
      query: () => USER_ORGANIZATIONS_ENDPOINT,
    }),
    getManageUsers: builder.query<UserOrganizationsResponse, void>({
      query: () => MANAGE_USERS_ENDPOINT,
    }),
    getNestedUserOrganizations: builder.query<UserOrganizationsResponse, void>({
      query: () => NESTED_USER_ORGANIZATIONS_ENDPOINT,
    }),
    addUserOrganization: builder.mutation<
      UserOrganization,
      Partial<UserOrganization>
    >({
      query: (body) => ({
        url: USER_ORGANIZATIONS_ENDPOINT,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "UserOrganizations", id: "LIST" }],
    }),
    updateManageUsers: builder.mutation<
      UserOrganization,
      Partial<UserOrganization> & Pick<UserOrganization, "id">
    >({
      query: ({ id, ...put }) => {
        console.log("id:", id);
        console.log("put in api slice:", put);
        return {
          url: `${MANAGE_USERS_ENDPOINT}${id}/`,
          // url: `${USER_ORGANIZATIONS_ENDPOINT}${id}/`,
          method: "PATCH",
          put,
        };
      },
      invalidatesTags: [{ type: "UserOrganizations", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useGetOrganizationsQuery,
  useAddOrganizationMutation,
  useGetUserOrganizationsQuery,
  useAddUserOrganizationMutation,
  useGetNestedUserOrganizationsQuery,
  useGetManageUsersQuery,
  useUpdateManageUsersMutation,
} = apiSlice;
