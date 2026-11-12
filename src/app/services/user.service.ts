import { UsersResponse } from "../types/user";
import httpService from "./http.service";

const userEndpoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get<UsersResponse>(userEndpoint);
    return data;
  },
};

export default userService;
