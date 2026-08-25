export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  target_date: string;
  created_at: string;
  is_completed: boolean;
  completed_at: string | null;
  reflection: string | null;
};
