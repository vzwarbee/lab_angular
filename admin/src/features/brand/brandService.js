import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { configLS } from '../../utils/configHeader'

const getBrands = async () => {
    const response = await axios.get(`${base_url}brand/`);

    return response.data;
}

const createBrand = async (brand) => {
    const response = await axios.post(`${base_url}brand/`, brand, configLS);

    return response.data;
}

const brandService = {
    getBrands,
    createBrand
}

export default brandService;