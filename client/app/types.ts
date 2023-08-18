export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_guid: string;
}

export type UsersResponse = User[];
