import React, { PropTypes } from 'react';
import { stitch } from 'keo';
import config from '../config';
import Button from './button';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    catalogue: PropTypes.array.isRequired,
    pageNumber: PropTypes.number
};

/**
 * @method getDefaultProps
 * @return {Object}
 */
const getDefaultProps = () => {
    return { pageNumber: 1 };
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    const maxPage = props.catalogue.length / config.perPage;
    const previousPage = props.pageNumber + 1;
    const nextPage = props.pageNumber - 1;

    const previousButton = (
        <Button path={`/page/${previousPage}`} className="active">
            Previous
        </Button>
    );

    const nextButton = (
        <Button path={nextPage === 1 ? '/' : `/page/${nextPage}`}>
            Next
        </Button>
    );

    return (
        <main className="component pagination">
            {previousPage <= maxPage && previousButton}
            {nextPage > 0 && nextButton}
        </main>
    );

};

export default stitch({ propTypes, getDefaultProps, render });
