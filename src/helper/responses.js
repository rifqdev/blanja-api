const sendSuccessResponse = (res, message, data, code) => {
  const codeStatus = code || 200;
  const response = {
    success: true,
    message: message,
    data: data,
  };

  res.status(codeStatus).json(response);
};

const sendErrorResponse = (res, message, errorDetails, code) => {
  const codeStatus = code || 500;
  const error = {
    success: false,
    message: message,
    errorDetails: errorDetails,
  };

  res.status(codeStatus).json(error);
};

const paginateData = async (Model, page, limit, code) => {
  const statusCode = code || 200;
  const offset = (page - 1) * limit;
  const result = await Model.findAll({
    limit: limit,
    offset: offset,
  });

  const totalCount = await Model.count();
  const totalPages = Math.ceil(totalCount / limit);

  const data = {
    currentPage: page,
    totalPages: totalPages,
    data: result,
  };

  res.status(statusCode).json(data);
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
  paginateData,
};
