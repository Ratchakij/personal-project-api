const cloudinary = require("../config/cloudinary");

exports.upload = async (path, publicId) => {
  const option = {
    use_filename: true,
    overwrite: true,
    unique_filename: false,
  };

  if (publicId) {
    option.public_id = publicId;
  }

  const res = await cloudinary.uploader.upload(path, option);
  return res.secure_url;
};

// ("https://res.cloudinary.com/dqt5f47ln/image/upload/v1663830513/1663830512449609624548.png");
exports.getPublicId = (url) => {
  const splitSlash = url.split("/");
  return splitSlash[splitSlash.length - 1].split(".")[0];
};
