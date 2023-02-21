export interface DataResponse {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  google_id: string;
}

export interface IUpdateProfile extends Partial<DataResponse> {}

export interface fetchResponse {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}
