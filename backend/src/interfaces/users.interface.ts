interface User {
  id: number;
  firstname: string;
  lastname: string;
  birthdate?: Date;
  img_url?: string;
  role_id: number;
  phone?: string;
  mail: string;
  password: string;
  city?: string;
  biography?: string;
  agency_id?: number;
  joined_at?: string;
  position_id?: number;
  score_id: number;
  created_at?: Date;
  active: boolean;
}

interface UserReqBody extends User {
  someStuff?: string;
}

export { User, UserReqBody };
