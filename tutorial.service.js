import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/patients");
  }

  get(token) {
    return http.get(`/patients/${token}`);
  }

  create(data) {
    return http.post("/patients", data);
  }

  update(token, data) {
    return http.put(`/patients/${token}`, data);
  }

  delete(token) {
    return http.delete(`/patients/${token}`);
  }

  deleteAll() {
    return http.delete(`/patients`);
  }

  findByTitle(name) {
    return http.get(`/patients?name=${name}`);
  }
}

export default new TutorialDataService();