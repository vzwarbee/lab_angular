import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { configLS } from '../../utils/configHeader'

const getProdCategorys = async () => {
    const response = await axios.get(`${base_url}prodCategory/`);

    return response.data;
};

const createProdCate = async (prodCate) => {
    const response = await axios.post(`${base_url}prodCategory/`, prodCate, configLS);

    return response.data;
}

const prodCateService = {
    getProdCategorys,
    createProdCate,
}

export default prodCateService;