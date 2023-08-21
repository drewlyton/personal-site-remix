import type Story from "./Story";

export type Newsletter = {
  createdAt: string;
  publishedAt: string;
  id: string;
  issueNumber: number;
  messageBody: string;
  preview: boolean;
  subject: string;
  updatedAt: string;
  sendGridId: string;
  sendGridDesignId: string;
  sendAt: string;
  story: Story;
};
