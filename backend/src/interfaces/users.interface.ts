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

interface UserPublicData
  extends Pick<User, "id" | "firstname" | "lastname" | "img_url" | "city"> {
  email?: string;
}

export { User, UserPublicData };
