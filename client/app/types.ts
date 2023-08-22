export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_guid: string;
}

export enum OrganizationStatus {
  Pending = "pending",
  Approved = "approved",
  Denied = "denied",
}

export interface Organization {
  id: number;
  swrs_org_id: number;
  business_legal_name: string;
  english_trade_name: string;
  french_trade_name: string;
  cra_business_number: string;
  status: OrganizationStatus;
}

export enum UserOrganizationRole {
  Admin = "admin",
  SuperAdmin = "superadmin",
}

export enum UserOrganizationStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export interface UserOrganization {
  id: number;
  user_id: number;
  organization_id: number;
  role: UserOrganizationRole;
  status: UserOrganizationStatus;
}

export type UsersResponse = User[];
export type OrganizationsResponse = Organization[];
export type UserOrganizationsResponse = UserOrganization[];
