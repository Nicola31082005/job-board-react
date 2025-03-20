/**
 * Simple throttling middleware for testing purposes
 * @param {number} delay - Delay in milliseconds
 * @returns {function} Express middleware
 */
const testThrottle = (delay = 2000) => {
  return (req, res, next) => {
    console.log(`Throttling request to ${req.originalUrl} for ${delay}ms`);
    setTimeout(() => {
      next();
    }, delay);
  };
};

export default testThrottle;
