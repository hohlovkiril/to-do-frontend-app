const SERVER_DEBUG_URI = 'http://localhost:3030/api';

const SERVER_PROD_URI = '';

export const SERVER_URI = process.env.NODE_ENV === 'development' ? SERVER_DEBUG_URI : SERVER_PROD_URI;