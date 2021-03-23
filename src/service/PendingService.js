import axios from "axios";

class PendingService{
    executeGetPendingService(pageNumber){
        let pageSize = 5;
        let approved = false;
        return axios.get(`http://localhost:8080/kyummy/auth/allpending/${pageNumber}/${pageSize}/${approved}`)
    }

    executeGetReadyService(pageNumber){
        let pageSize = 5;
        let approved = true;
        return axios.get(`http://localhost:8080/kyummy/auth/allpending/${pageNumber}/${pageSize}/${approved}`)
    }

    executeApprovePendingService(pendingId, approved){
        return axios.put(`http://localhost:8080/kyummy/auth/pending/${pendingId}/approved`, approved)
    }

    executeReceivedService(pendingId,approved){
        return axios.put(`http://localhost:8080/kyummy/auth/pending/${pendingId}/received`, approved)
    }
    executeGetAllReceivedService(pageNumber){
        let pageSize = 5;
        let received = true;
        return axios.get(`http://localhost:8080/kyummy/auth/allpending/${pageNumber}/${pageSize}/${received}/received`)
    }
    executeDeleteService(pendingId){
        return axios.delete(`http://localhost:8080/kyummy/auth/pending/${pendingId}/delete`)
    }
}

export default new PendingService();