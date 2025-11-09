const conectedEndpoint = (req, res, next) => {
  console.log(`🚩 Conexión en el endpoint: ${req.originalUrl}`);
  next();
};

export default conectedEndpoint;
