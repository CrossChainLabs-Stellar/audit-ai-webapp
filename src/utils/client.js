import axios from 'axios';

axios.defaults.timeout = 300000;

//const API = import.meta.env.REACT_APP_API || 'https://auditron.io/api';
const API = import.meta.env.REACT_APP_API || 'http://localhost:4001';

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
    console.log(data);
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

  // Message endpoint: POST /message
  async message(name, email, subject, message) {
    return this.post('/message', { name, email, subject, message });
  }

  // Audit endpoint: POST /audit
  // Expects: accountWallet (string), projectName (string), fileName (string), codeFiles (Files)
  async runAudit(accountWallet, projectName, fileName, codeFiles) {
    try {
      const form = new FormData();
      form.append('accountWallet', accountWallet);
      form.append('projectName', projectName);
      form.append('fileName', fileName);

      for (const f of codeFiles) {
        form.append("codeFiles", f); // field name is plural
      }


      // axios will set the multipart boundary automatically
      // axios will set the multipart boundary automatically
      const response = await this.post(`${this.api}/audit`, form, {
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

  async runAuditRepo(accountWallet, projectName, repoUrl) {
    return this.post('/auditrepo', { accountWallet, projectName, repoUrl }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export default Client;
