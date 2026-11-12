export type ServerQuality = {
  _id: string;
  name: string;
  color: "primary" | "secondary" | "success" | "danger" | "info" | "dark";
};

export type QualityResponse = {
  status: number;
  content: ServerQuality[];
  message: string;
};
