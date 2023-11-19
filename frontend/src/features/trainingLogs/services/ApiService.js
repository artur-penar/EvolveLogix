import AxiosInstance from "api/utils/axiosInstance";

const ApiServices = {
  async get(endpoint, parms) {
    try {
      const response = await AxiosInstance.get(endpoint, parms);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ApiServices;
