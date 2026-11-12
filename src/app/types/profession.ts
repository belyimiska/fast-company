export type ServerProfession = {
  _id: string;
  name: string;
};

export type ProfessionResponse = {
  status: number;
  content: ServerProfession[];
  message: string;
};
