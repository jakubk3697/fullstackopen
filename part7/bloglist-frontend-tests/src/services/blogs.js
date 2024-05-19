import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const getUserBlogs = async (userId) => {
  const request = axios.get(`${baseUrl}/users/${userId}`);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (updatedBlog) => {
  const request = axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog);
  const response = await request;
  return response.data;
};

const createComment = async (blogId, comment) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    { comment },
    config,
  );
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${id}`, config);
  const response = await request;
  return response.data;
};

export default {
  getAll,
  getUserBlogs,
  create,
  update,
  createComment,
  setToken,
  remove,
};
