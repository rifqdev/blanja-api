const getPublicId = (url) => {
  const regex = /\/(?:image|video|raw)\/upload\/v\d+\/(.+)\.[a-zA-Z]+$/;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    throw new Error("Invalid Cloudinary URL");
  }
};

module.exports = getPublicId;
