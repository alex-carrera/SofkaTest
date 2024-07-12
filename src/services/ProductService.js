import axios from 'axios'
import { BASE_URL } from '@env';

const authHeader = () => ({
    'authorId': '1',
    'Content-Type': 'application/json'
});

class ProductsService {
    async getProductos() {
        try {
            const res = await axios.get(BASE_URL, { headers: authHeader() });
            return res.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async postProductos(data) {
        try {
            const res = await axios.post(BASE_URL, data, { headers: authHeader() });
            return res.data;
        } catch (error) {
            console.error('Error posting product:', error);
            throw error;
        }
    }

    async putProductos(data) {
        try {
            const res = await axios.put(BASE_URL, data, { headers: authHeader() });
            return res.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }
    

    async deleteProductos(id) {
        try {
            const res = await axios.delete(`${BASE_URL}?id=${id}`, { headers: authHeader() });
            return res.data;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
    

    async verificationProductos(id) {
        try {
            const res = await axios.get(`${BASE_URL}/verification?id=${id}`, {headers: authHeader()});
            return res.data;
        } catch (error) {
            console.error('Error verifying product:', error);
            throw error;
        }
    }
    
}

export default new ProductsService();