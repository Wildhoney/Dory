import React, { PropTypes } from 'react';
import { stitch } from 'keo';
import DocumentTitle from '../components/document-title';

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    return (
        <DocumentTitle title="Not Found">
            <main className="page not-found">

                <h2>Not Found</h2>

            </main>
        </DocumentTitle>
    );

};

export default stitch({ render });
