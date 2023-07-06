import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const apiAdminCategories = async () => {
  const route = "/api/admin/categories/";
  const response = await axios.get(`${url}${route}`);
  return response;
};

const apiAdminCreateCategory = async (category) => {
  const route = "/api/admin/categories/";
  const response = await axios.post(`${url}${route}`, category);
  return response;
};

const apiAdminUpdateCategoryById = async (id, updatedCategory) => {
  const route = "/api/admin/categories/";
  const response = await axios.put(`${url}${route}${id}`, updatedCategory);
  return response;
};

const apiAdminDeleteCategory = async (id) => {
  const route = "/api/admin/categories/";
  const response = await axios.delete(`${url}${route}${id}`);
  return response;
};

export {
  apiAdminCategories,
  apiAdminCreateCategory,
  apiAdminUpdateCategoryById,
  apiAdminDeleteCategory,
};
