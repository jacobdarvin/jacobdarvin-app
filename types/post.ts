export type Post = {
  id: string;
  title: string;
  created_at: {
    _seconds: number;
    _nanoseconds: number;
  };
  content: string;
};
