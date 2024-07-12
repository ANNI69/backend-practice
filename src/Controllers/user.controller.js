import { ApiError } from "../Utils/ApiErrors";
import { User } from "../Models/user.model";
import { ApiResponse } from "../Utils/ApiResponse";
import { Cloudnary } from "../Utils/Cloudnary";
import { ApiResponse } from "../Utils/ApiResponse";

const generateAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating access token");
  }
};

const registerUser = async (req, res) => {
  const { email, username, password } = req.body; //Get The email, username and password from the request body

  if (!email || !username || !password) {
    throw new ApiError(400, "Email, Username and Password are required");
  } //If any of the required fields are missing, throw an error

  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (user) {
    throw new ApiError(409, "User already exists"); //If the user already exists, throw an error
  } //Check if the user already exists

  const newUser = new User({
    email,
    username,
    password,
  }); //Create a new user

  if (req.files) {
    if (req.files.avtar) {
      const avtar = await Cloudnary.upload(req.files.avtar[0].path); //Upload the avtar file to cloudnary
      newUser.avtar = avtar.url; //Set the avtar url to the user
    } //If there is an avtar file
    if (req.files.coverImage) {
      //If there is a cover image file
      const coverImage = await Cloudnary.upload(req.files.coverImage[0].path); //Upload the cover image file to cloudnary
      newUser.coverImage = coverImage.url; //Set the cover image url to the user
    }
  } //If there are files in the request

  await newUser.save(); //Save the new user to the database
  const { accessToken, refreshToken } = await generateAndAccessToken(
    newUser._id
  ); //Generate an access token and a refresh token for the new user
  const loggedInUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  ); //Get the user from the database without the password and the refresh token
  const options = {
    //Options for the cookies
    httpOnly: true,
    secure: true,
  };

  return res //Return a response with the user, the access token and the refresh token
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(201, { user: loggedInUser, accessToken, refreshToken }) //Return a response with the user, the access token and the refresh token
    );
};

const loginUser = async (req, res) => {
  const { email, username, password } = req.body;
  // console.log(email, username, password);
  if (!email || !username) {
    throw new ApiError(400, "Email or Username are required");
  }
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }
  const { accessToken, refreshToken } = await generateAndAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken })
    );
};

const logoutUser = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new ApiError(401, "Not authorized");
  }
  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new ApiError(401, "Not authorized");
  }
  user.refreshToken = "";
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, "Logged out successfully"));
};

export { registerUser, loginUser };
