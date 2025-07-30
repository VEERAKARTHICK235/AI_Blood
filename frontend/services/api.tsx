import axios, { AxiosResponse } from 'axios';

// --- Type Definitions ---
// These should match the models in your backend
interface User {
  id: number;
  email: string;
  full_name: string;
  phone_number: string;
  city: string;
  blood_type: string;
  user_type: 'patient' | 'donor';
}

interface DonationRequest {
  id: number;
  patient_id: number;
  blood_type: string;
  request_date: string; 
  status: 'open' | 'matched' | 'closed';
}

// Data for creating a new user
type UserCreate = Omit<User, 'id'>;

// --- API Configuration ---
// Remember to change this to your computer's local IP address
const API_URL = 'http://000.000.0.00:8000'; 

const api = axios.create({
  baseURL: API_URL,
});

// --- API Functions ---
// User functions
export const registerUser = (userData: UserCreate): Promise<AxiosResponse<User>> => 
  api.post('/users/', userData);

export const getUsers = (userType: 'patient' | 'donor'): Promise<AxiosResponse<User[]>> => 
  api.get(`/users/?user_type=${userType}`);

// Request functions
export const getOpenRequests = (): Promise<AxiosResponse<DonationRequest[]>> => 
  api.get('/requests/open');

export const findMatches = (requestId: number): Promise<AxiosResponse<User[]>> => 
  api.get(`/match/${requestId}`);

export default api;
