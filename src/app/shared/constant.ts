import { environment } from "../../environments/environment";

const BASE_URL = environment.production? 'https://ecommerence-store-backend.onrender.com' : 'http://localhost:3000';

export const PRODUCTS_URL = BASE_URL + '/api/products';

export const PRODUCT_BY_ID_URL = PRODUCTS_URL + '/';