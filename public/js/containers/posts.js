import React, { PropTypes } from 'react';
import { stitch } from 'keo/redux';
import by from 'sort-by';
import ordinal from 'ordinal';
import DocumentTitle from '../components/document-title';
import hash from 'object-hash';
import pluralize from 'pluralize';
import Post from '../components/post';
import Pagination from '../components/pagination';
import { getPosts } from '../actions';
import config from '../config';

/**
 * @constant propTypes
 * @type {{posts: Number}}
 */
const propTypes = {
    catalogue: PropTypes.array.isRequired,
    params: PropTypes.shape({
        pageNumber: PropTypes.string
    })
};

/**
 * @constant statics
 * @type {Object}
 */
const statics = {

    /**
     * @method fetchData
     * @param {Function} dispatch
     * @param {Object} params
     * @return {Promise}
     */
    fetchData: (dispatch, params) => {
        return dispatch(getPosts(params.pageNumber || 1));
    }

};

/**
 * @method dispatch
 * @param {Function} dispatch
 * @param {Object} props
 * @return {void}
 */
const componentDidMount = ({ dispatch, props }) => {
    statics.fetchData(dispatch, props.params);
};

/**
 * @method componentDidUpdate
 * @param {Function} dispatch
 * @param {Object} props
 * @param {Object} prevProps
 * @return {void}
 */
const componentDidUpdate = ({ dispatch, props, prevProps }) => {
    const hasChangedPage = prevProps.params.pageNumber !== props.params.pageNumber;
    hasChangedPage && statics.fetchData(dispatch, props.params);
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    const pageNumber = Number(props.params.pageNumber || 1);
    const perPage = config.perPage;
    const index = (pageNumber - 1) * perPage;
    const posts = [ ...props.catalogue ].sort(by('createdDate')).reverse().slice(index, index + perPage);
    const morePages = props.catalogue.length > posts.length;

    return (
        <DocumentTitle title={pageNumber === 1 ? 'Posts' : `Posts (${ordinal(pageNumber)} Page)`}>
            <main className="page posts">

                <h2>
                    Welcome
                    <label>
                        ({props.catalogue.length} {(pluralize('Post', props.catalogue.length))})
                    </label>
                </h2>

                {posts.map((model, index) => {
                    
                    const className = index === 0 ? 'first' : index === (posts.length - 1) ? 'last' : '';

                    return (
                        <Post key={hash(model)} {...props} className={className}
                              synopsis={config.displaySynopsis} model={model} />
                        
                    );
                })}

                {morePages && <Pagination {...props} pageNumber={pageNumber} disableFirstPage={Boolean(true)} />}

            </main>
        </DocumentTitle>
    );

};

export default stitch({ statics, propTypes, componentDidMount, componentDidUpdate, render }, state => state);
