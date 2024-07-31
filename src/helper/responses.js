const sendSuccessResponse = (res, message, data, code) => {
  const codeStatus = code || 200;
  const response = {
    success: true,
    message: message,
    data: data,
    code: codeStatus,
  };

  res.status(codeStatus).json(response);
};

const sendErrorResponse = (res, message, errorDetails, code) => {
  const codeStatus = code || 500;
  const error = {
    success: false,
    message: message,
    errorDetails: errorDetails,
    code: codeStatus,
  };

  res.status(codeStatus).json(error);
};

const paginateData = async (res, Model, where, page, limit, attributes, order, include) => {
  const statusCode = 200;
  const offset = (page - 1) * limit;
  const result = await Model.findAll({
    where: where,
    limit: limit,
    offset: offset,
    attributes: attributes,
    order: order,
    include: include,
  });

  const totalCount = await Model.count({ where, distinct: true });
  const totalPages = Math.ceil(totalCount / limit);

  const data = {
    currentPage: page,
    totalPages: totalPages,
    totalData: totalCount,
    data: result,
    code: statusCode,
  };

  res.status(statusCode).json(data);
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
  paginateData,
};
