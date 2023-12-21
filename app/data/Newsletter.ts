export type Newsletter = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  subject: string;
  preview: string;
  body: string;
  sendAt: string;
  shouldSend: boolean;
  sendGridId: string;
  sendGridDesignId: string;
  author: {
    bio: string;
    name: string;
    image: string;
  };
};
