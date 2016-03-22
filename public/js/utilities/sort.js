import sorty from 'sorty';
import config from '../config';

export default (strategy = config.sortOrder) => {

    return sorty(strategy.map(x => {
        return { name: x[0], dir: x[1] };
    }));

};
