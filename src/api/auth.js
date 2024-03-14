import axios from 'axios';

axios.defaults.withCredentials = true;

export async function login(loginData) {
  return await axios.post('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/login', loginData);
}

export async function register(registrationData) {
  return await axios.post('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/signup', registrationData);
}
export async function employeeRegister(registrationData,config) {
  return await axios.post('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/employee/signup', registrationData, config);
}
