import axios from 'axios';
import * as event from './config/events';

/**
 * @method getPosts
 * @return {Object}
 */
export function getCatalogue() {

    /**
     * @method fetchCatalogue
     * @return {axios.Promise}
     */
    const fetchCatalogue = () => {
        /** todo: Use dynamic URL or config */
        return axios.get(`http://localhost:5000/assets/catalogue.json`).then(response => response.data);
    };

    return {
        type: event.CATALOGUE,
        promise: fetchCatalogue()
    };

}
