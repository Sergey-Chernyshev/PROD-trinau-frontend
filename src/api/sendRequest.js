import axios from 'axios';


const sendRequest = async (method, url, data = null, headers = {}) => {
    try {
        const response = await axios({
            method: method,
            url: url,
            data: data,
            headers: headers
        })
        return {code: 0, message: response.data}; 
    } catch (error) {
        return {code: -1, message: error}
    }
};

export default sendRequest;
