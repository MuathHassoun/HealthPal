// Frontend API utility for communicating with backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

class APIClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.token = null;
    // Load token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle 401 - unauthorized, clear token
      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        this.token = null;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `API error: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(userData) {
    return this.request('/users/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser() {
    return this.request('/users/me', {
      method: 'GET',
    });
  }

  // Patients endpoints
  async getPatients(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/users/patients${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
    });
  }

  async getPatient(id) {
    return this.request(`/users/patients/${id}`, {
      method: 'GET',
    });
  }

  // Consultations endpoints
  async getConsultations() {
    return this.request('/consultations', {
      method: 'GET',
    });
  }

  async createConsultation(consultationData) {
    return this.request('/consultations', {
      method: 'POST',
      body: JSON.stringify(consultationData),
    });
  }

  async getConsultation(id) {
    return this.request(`/consultations/${id}`, {
      method: 'GET',
    });
  }

  // Alerts endpoints
  async getAlerts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/alerts${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
    });
  }

  // Education endpoints
  async getEducationResources(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/education${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
    });
  }

  // Support sessions endpoints
  async getSupportSessions() {
    return this.request('/mental-support', {
      method: 'GET',
    });
  }

  async createSupportSession(sessionData) {
    return this.request('/mental-support', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  // Donations endpoints
  async getDonations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/donations${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
    });
  }

  setToken(token) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}

export const apiClient = new APIClient();
export default APIClient;
