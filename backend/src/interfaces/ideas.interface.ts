interface Idea {
  id: number;
  title: string;
  body: string;
  user_id: number;
  created_at: Date;
  modified_at: Date | null;
  modified_user_id: number | null;
  archived_at: Date | null;
  archived_user_id: number | null;
  deleted_at: Date | null;
  deleted_user_id: number | null;
  goal: string | null;
  profits: string | null;
  risks: string | null;
  active: boolean;
  private: boolean;
}

interface IdeaFilterQuery {
  userId?: string;
  userAgencyId?: string;
  publicationDateStart?: string;
  publicationDateEnd?: string;
  autorSelectionTag?: string;
  selectedCategories?: string[];
  trendingTag?: string;
  titleContains?: string;
  hasAttachment?: string;
  hasNoComment?: string;
}

export { Idea, IdeaFilterQuery };
