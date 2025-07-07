export type Page = {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: {
    id: string;
    label: string;
    value: string;
  }[];
};
