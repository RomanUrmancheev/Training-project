import httpService from "./http.service";

const commentEndpoint = "comment/";

const commentService = {
  createComment: async (payload) => {
    const { data } = await httpService.post(commentEndpoint, payload);
    return data;
  },
  getComment: async (pageId) => {
    const { data } = await httpService.get(commentEndpoint, {
      params: {
        orderBy: "pageId",
        equalTo: `${pageId}`
      }
    });
    return data;
  },
  deleteComment: async (commentId) => {
    const { data } = await httpService.delete(commentEndpoint + commentId);
    return data;
  }
};

export default commentService;
