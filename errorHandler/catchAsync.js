const catchAsync = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next();
    }
  };
};

export default catchAsync;
