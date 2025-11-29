export interface ICreatePost {
  title?: unknown;
  body?: unknown;
  userId?: unknown;
}

export interface CreatePost {
  valid: boolean;
  errors?: {
    title?: string;
    body?: string;
    userId?: string;
  };
  data?: {
    title: string;
    body: string;
    userId: string;
  };
}
