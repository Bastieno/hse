export const CLOUD_NAME = 'dqp2aponn';
export const IMAGE_UPLOAD_BASE_URL = `${
    process.env.NODE_ENV === 'production' ? 'https' : 'http'
}://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
export const IMAGE_FETCH_BASE_URL = `${
    process.env.NODE_ENV === 'production' ? 'https' : 'http'
}://res.cloudinary.com/${CLOUD_NAME}/image/list`;
