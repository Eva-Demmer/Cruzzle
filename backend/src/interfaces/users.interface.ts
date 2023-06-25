interface User {
  id: number;
  mail: string;
  hashed_password: string;
  role_id: number;
  avatar_url?: string;
  banner_url?: string;
  firstname: string;
  lastname: string;
  birthdate?: Date;
  share_birthdate?: boolean | null;
  phone?: string;
  share_phone?: boolean | null;
  biography?: string;
  agency_id?: number;
  joined_at?: string;
  position_id?: number;
  score_comment: number;
  score_idea: number;
  score_like: number;
  created_at: Date;
  is_active?: boolean | null;
}

export default User;
