/**
 * Helper method to merge the posts, prioritising models which have "content" properties.
 *
 * @method merge
 * @param {Array} currentState
 * @param {Array} updatedState
 * @return {Array}
 */
export const merge = (currentState, updatedState) => {

    return updatedState.reduce((accumulator, post) => {

        const index = currentState.findIndex(model => model.slug === model.slug);
        const isExisting = !!~index;
        const currentHasContent = isExisting && currentState[index].hasOwnProperty('content');

        if (isExisting && currentHasContent) {

            // We already have the model with a valid "content" property.
            return [ ...accumulator ];

        }

        if (isExisting) {

            // We've just discovered the model with a valid "content" property, so we'll replace the existing.
            return [...accumulator.slice(0, index), post, ...accumulator.slice(index + 1)];

        }

        // Otherwise we've found a new model and so we'll simply append it.
        return [ ...accumulator, post ];

    }, currentState);

};
