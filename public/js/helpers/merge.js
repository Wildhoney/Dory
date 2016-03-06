import by from 'sort-by';

/**
 * helpers method to merge the posts, prioritising models which have "content" properties.
 *
 * @method merge
 * @param {Array} currentState
 * @param {Array} updatedState
 * @return {Array}
 */
export const merge = (currentState, updatedState) => {

    const mergedModels = [ ...currentState, ...updatedState ];

    return mergedModels.reduce((accumulator, post) => {

        const duplicates = mergedModels.filter(model => model.slug === post.slug);
        const hasContent = post.hasOwnProperty('content');
        const anotherHasContent = duplicates.some(model => model.hasOwnProperty('content'));
        const hasAlready = accumulator.find(model => model.slug === post.slug);

        if (hasAlready) {
            // We already have the current model.
            return accumulator;
        }

        if (hasContent) {
            // Current model has a "content" property and therefore we'll keep it.
            return [ ...accumulator, post ];
        }

        if (duplicates.length === 1) {
            // Current model is the only one therefore we'll keep it.
            return [ ...accumulator, post ];
        }

        if (anotherHasContent) {
            // Property "content" exists in one of the duplicate models.
            return accumulator;
        }

        return [  ...accumulator, post ];

    }, []);

};
