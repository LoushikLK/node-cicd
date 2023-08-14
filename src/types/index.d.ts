export interface AuthorizedUser {
  _id: string;
  email: string;
  role: string;
  clientServiceId: string;
  clientServiceRole: string;
}
