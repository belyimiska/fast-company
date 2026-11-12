export type ServerUser = {
  _id: string;
  name: string;
  profession: string;
  qualities: string[];
  completedMeetings: number;
  rate: number;
  email: string;
};

export type UsersResponse = {
  status: number;
  content: ServerUser[];
  message: string;
};
