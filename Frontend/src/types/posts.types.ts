export type Post = {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  facultyId: string;
  author?: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreatePostRequest = {
  title: string;
  content: string;
  facultyId: string;
};

export type UpdatePostRequest = {
  title?: string;
  content?: string;
};
