import {
  UsersResponse,
  OrganizationsResponse,
  User,
  Organization,
  UserOrganizationsResponse,
  UserOrganization,
  FacilitiesResponse,
} from "@/app/types";
import {
  BASE_URL,
  FACILITIES_ENDPOINT,
  NESTED_ORGANIZATIONS_ENDPOINT,
  NESTED_USER_ORGANIZATIONS_ENDPOINT,
  ORGANIZATIONS_ENDPOINT,
  USERS_ENDPOINT,
  USER_ORGANIZATIONS_ENDPOINT,
} from "@/constants/apiEndpoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Users", "Organizations", "UserOrganizations", "Facilities"],
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
    getNestedOrganizations: builder.query<OrganizationsResponse, void>({
      query: () => NESTED_ORGANIZATIONS_ENDPOINT,
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
    // Facility endpoints
    getFacilities: builder.query<FacilitiesResponse, void>({
      query: () => FACILITIES_ENDPOINT,
      // providesTags: (result) =>
      //   result
      //     ? [
      //         ...result.map(({ facility_name }) => ({
      //           type: "Facilities" as const,
      //           facility_name,
      //         })),
      //         { type: "Facilities", id: "LIST" },
      //       ]
      //     : [{ type: "Facilities", id: "LIST" }],
    }),
    addFacility: builder.mutation<
      FacilitiesResponse,
      Partial<FacilitiesResponse>
    >({
      query: (body) => ({
        url: FACILITIES_ENDPOINT,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Facilities", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useGetOrganizationsQuery,
  useAddOrganizationMutation,
  useGetNestedOrganizationsQuery,
  useGetUserOrganizationsQuery,
  useAddUserOrganizationMutation,
  useGetNestedUserOrganizationsQuery,
  useGetFacilitiesQuery,
  useAddFacilityMutation,
} = apiSlice;
