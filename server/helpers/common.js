/**
 * @method isProduction
 * @return {Boolean}
 */
export const isProduction = () => process.env.NODE_ENV === 'production';
