const statusCode = {
  OK: 200,
  CREATED: 201,
  'BAD REQUEST': 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  'NOT FOUND': 404,
  'INTERNAL SERVER ERROR': 500,
  'SERVICE UNAVAILABLE': 503,
};

const newError = ({ status, msg }) => {
  const err = new Error(status);
  err.msg = msg;
  err.code = statusCode[status];

  return err;
};

module.exports = newError;
