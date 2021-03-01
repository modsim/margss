import http from "../http-common";

class MARGSSDataService {
    getAll() {
        return http.get("/job");
    }

    get(id) {
        return http.get(`/job/${id}`);
    }

    create(data) {
        console.log('send post with ' + data.name)
        return http.post("/job/" + data.name, data.form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }

    delete(id) {
        return http.delete(`/job/${id}`);
    }

    deleteAll() {
        return http.delete(`/job`);
    }

    findByTitle(title) {
        return http.get(`/tutorials?title=${title}`);
    }
}

export default new MARGSSDataService();
