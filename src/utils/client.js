import axios from 'axios';

axios.defaults.timeout = 300000;

//const API = import.meta.env.REACT_APP_API || 'https://auditron.io/api';
const API = import.meta.env.REACT_APP_API || 'http://209.38.172.60/api';
//const API = import.meta.env.REACT_APP_API || 'http://localhost:4000';

export class Client {
  constructor() {
    this.api = API;
  }

  // Generic GET method with optional query parameters
  async get(endpoint, params = {}) {
    try {
      const response = await axios.get(`${this.api}${endpoint}`, { params });
      if (response.status !== 200) {
        return undefined;
      }
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      return undefined;
    }
  }

  // Generic POST method
  async post(endpoint, data, config = {}) {
    try {
      const response = await axios.post(`${this.api}${endpoint}`, data, config);
      if (response.status !== 200) {
        return undefined;
      }
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      return undefined;
    }
  }

  // Waitlist endpoint: POST /waitlist
  async waitlist(email) {
    return this.post('/waitlist', { email });
  }

  // Audit endpoint: POST /audit
  // Expects: accountWallet (string), projectName (string), fileName (string), codeFile (File)
  async runAudit(accountWallet, projectName, fileName, codeFile) {
    try {
      const formData = new FormData();
      formData.append('accountWallet', accountWallet);
      formData.append('projectName', projectName);
      formData.append('fileName', fileName);
      formData.append('codeFile', codeFile);

      // axios will set the multipart boundary automatically
      const response = await axios.post(`${this.api}/audit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.status !== 200) {
        return undefined;
      }
      return response.data;
    } catch (error) {
      console.error('runAudit failed:', error);
      return undefined;
    }
  }

  // GET audit: GET /audit/:accountWallet
  async getAudit(accountWallet) {
    return this.get(`/audit/${accountWallet}`);
  }
};

export default Client;
