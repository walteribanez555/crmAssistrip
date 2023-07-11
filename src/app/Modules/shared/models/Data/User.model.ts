// Generated by https://quicktype.io

export interface UserResp {
  fieldCount:   number;
  affectedRows: number;
  insertId:     number;
  serverStatus: number;
  warningCount: number;
  message:      string;
  protocol41:   boolean;
  changedRows:  number;
}
// Generated by https://quicktype.io

export interface User {
  username:        string;
  rol_id:          string;
  user_type:       string;
  hashed_password: string;
  first_name:      string;
  last_name:       string;
  email:           string;
  phone:           string;
  status:          number;
  date_created:    string;
}
