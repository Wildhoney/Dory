import React from 'react';
import { stitch } from 'keo';
import DocumentTitle from '../components/document-title';

/**
 * @method render
 * @return {XML}
 */
const render = () => {

    return (
        <DocumentTitle title="Not Found">
            <main className="page not-found">
                <h2>Page Not Found</h2>
                <p>We apologise but we cannot find the page you're looking for.</p>
            </main>
        </DocumentTitle>
    );

};

export default stitch({ render });
