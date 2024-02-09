export type Author = {
  name: string;
  bio: string;
  image: {
    asset: {
      _ref: string;
    };
  };
};

export type Image = {
  asset: {
    _ref: string;
  };
};

export type Tag = { title: string; description: string };

export type Post = {
  _id: string;
  title: string;
  description: string;
  body: string;
  slug: string;
  mainImage: Image;
  author: Author;
  publishedAt: string;
  tags: Tag[];
  linkedinPost: string;
};

export type Note = {
  _id: string;
  _updatedAt: string;
  title: string;
  body: string;
};
