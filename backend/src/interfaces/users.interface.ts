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
  score_comment?: number;
  score_idea?: number;
  score_like?: number;
  created_at?: Date;
  is_active?: boolean | null;
  language?: string;
}

interface UpdatePasswordUser {
  id: number;
  mail: string;
  hashed_password: string;
}

interface CreateUser {
  mail: string;
  hashed_password: string;
  role_id: number;
  firstname: string;
  lastname: string;
  agency_id: number;
  joined_at: string;
  position_id: number;
  is_active: boolean;
}

interface UserLoginUpdatedRequest {
  mail: string;
  hashed_password: string;
}

interface UserFilterQuery {
  lastnameContains?: string;
  firstnameContains?: string;
  agenciesValue?: string;
  locationValue?: string;
  roleValue?: string;
  positionValue?: string;
  publicationDateStart?: string;
  publicationDateEnd?: string;
}

interface UserLeaderboard {
  id?: number;
  firstname: string;
  lastname: string;
  _count: {
    idea: number;
    idea_like: number;
    comment_like: number;
    comment: number;
    idea_teams: number;
  };
}

interface FormattedUserLeaderboard {
  id?: number;
  firstname: string;
  lastname: string;
  _count?: {
    idea: number;
    idea_like: number;
    comment_like: number;
    comment: number;
    idea_teams: number;
  };
  score: number;
}

export {
  User,
  CreateUser,
  UserLoginUpdatedRequest,
  UserFilterQuery,
  UpdatePasswordUser,
  UserLeaderboard,
  FormattedUserLeaderboard,
};
