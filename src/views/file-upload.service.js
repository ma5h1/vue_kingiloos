import * as axios from 'axios';

const BASE_URL = 'http://localhost:8080/event';

function upload(formData) {
    const url = `${BASE_URL}/upload`;
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
}

export {upload}