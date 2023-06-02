import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { configLS } from '../../utils/configHeader'

const getBlogCate = async () => {
    const response = await axios.get(`${base_url}blogCategory/`);

    return response.data;
};

const createBlogCate = async (blogCate) => {
    const response = await axios.post(`${base_url}blogCategory/`, blogCate, configLS);

    return response.data;
}

const blogCateService = {
    getBlogCate,
    createBlogCate
}

export default blogCateService;