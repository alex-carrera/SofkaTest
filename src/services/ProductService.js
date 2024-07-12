import axios from 'axios'
import { BASE_URL } from '@env';


class ProductsService {
    async getProductos() {

        try {
            const res = await axios.request({
                url: BASE_URL,
                headers: {
                    'authorId': '1'
                }
            });
            return res.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async postProductos(data) {
        const res = await axios.post(process.env.BASE_URL, data, { headers: authHeader() });
        return res.data;
    }

    async putProductos(data) {
        const res = await axios.put(process.env.BASE_URL, data, { headers: authHeader() });
        return res.data;
    }

    async deleteProductos(id) {
        const res = await axios.put(process.env.BASE_URL + `?${id}`, data, { headers: authHeader() });
        return res.data;
    }

    async verificationProductos(id) {
        const res = await axios.put(process.env.BASE_URL + `/verification?${id}`, data, { headers: authHeader() });
        return res.data;
    }
}

export default new ProductsService();