import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getEnq = async () => {
    const response = await axios.get(`${base_url}enquiry/`);

    return response.data;
}

const enqService = {
    getEnq,
}

export default enqService;