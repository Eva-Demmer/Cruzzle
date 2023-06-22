interface User {
  id: number;
  firstname: string;
  lastname: string;
  birthdate?: Date;
  img_url?: string;
  phone?: string;
  mail: string;
  city?: string;
  biography?: string;
  agency_id?: number;
  joined_at?: string;
  position_id?: number;
  score_id: number;
}

interface UserAdmin extends User {
  role_id: number;
  created_at: Date;
  passwordHash: string;
}

export { User, UserAdmin };
