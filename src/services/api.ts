const API_URL = "http://localhost:5000/api";

export async function registerUser(data: any) {
  return {
    success: true,
    message: "Demo registration successful",
    user: data,
  };
}

export async function loginUser(data: any) {
  return {
    success: true,
    message: "Demo login successful",
    token: "demo-token",
  };
}

export async function approveRequest() {
  return {
    success: true,
    message: "Access approved",
  };
}
