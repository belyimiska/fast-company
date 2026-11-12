import { ProfessionResponse } from "../types/profession";
import httpService from "./http.service";

const professionEndpoint = "profession/";

const professionService = {
  get: async () => {
    const { data } = await httpService.get<ProfessionResponse>(professionEndpoint);
    return data;
  },
};

export default professionService;
