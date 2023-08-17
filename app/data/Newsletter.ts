import type Story from "./Story";

export type Newsletter = {
  createdAt: string;
  publishedAt: string;
  id: string;
  issueNumber: number;
  messageBody: string[];
  previewText: string;
  updatedAt: string;
  story: Story;
};
