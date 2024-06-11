import axios from "axios";


const register = async (formData) => {
  console.log(formData)
  const response = await axios.post("https://supportdesk-backend-1.onrender.com/api/auth/register", formData);
  localStorage.setItem("users", JSON.stringify(response.data));
  return response.data;
};

const login = async (formData) => {
  const response = await axios.post("https://supportdesk-backend-1.onrender.com/api/auth/login", formData);
  if (response.data.isBlocked) {
    throw new Error("User is blocked");
  }
  localStorage.setItem("users", JSON.stringify(response.data));
  return response.data;
};

const getAllUsers = async () => {
  const users = JSON.parse(localStorage.getItem("users"));
  if (!users || !users.token) {
    throw new Error("No token found");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${users.token}`,
    },
  };
  const response = await axios.get("https://supportdesk-backend-1.onrender.com/api/auth/" + "users", config);
  return response.data;
};


const BlockUser = async (userId, isBlocked) => {
  const users = JSON.parse(localStorage.getItem("users"));
  if (!users || !users.token) {
    throw new Error("No token found");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${users.token}`,
    },
  };
  const response = await axios.put(
    `https://supportdesk-backend-1.onrender.com/api/auth/block/${userId}`,
    { isBlocked },
    config
  );
  return response.data;
};

const authService = {
  register,
  login,
  getAllUsers,
  BlockUser,
};

export default authService;
