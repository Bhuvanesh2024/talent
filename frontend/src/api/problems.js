import axiosInstance from "../lib/axios";

export const problemApi = {
  getAllProblems: async () => {
    const response = await axiosInstance.get("/problems");
    return response.data;
  },

  getProblemById: async (id) => {
    const response = await axiosInstance.get(`/problems/${id}`);
    return response.data;
  },

  getProblemByTitle: async (title) => {
    const response = await axiosInstance.get(`/problems/title/${encodeURIComponent(title)}`);
    return response.data;
  },

  runTestCases: async (problemId, code, language) => {
    const response = await axiosInstance.post("/problems/test", {
      problemId,
      code,
      language,
    });
    return response.data;
  },
};