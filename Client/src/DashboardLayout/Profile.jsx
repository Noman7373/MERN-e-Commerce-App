import React, { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { updloadAvater } from "../Api/Query/userQuery";
import { updateUserAvatar } from "../store/userSlice";
import Loader from "../components/status/Loader";

const Profile = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get the user data from the Redux store
  const user = useSelector((state) => state.user);

  // Handle avatar file selection and upload
  const handleAvatarImage = async (e) => {
    const uploadFile = e.target.files[0];
    if (!uploadFile) return;

    // File validation
    if (uploadFile.size > 5 * 1024 * 1024) {
      setErrorMessage("File size exceeds 5MB. Please choose a smaller file.");
      return;
    }

    setErrorMessage(""); // Clear any previous errors
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", uploadFile);

      const response = await updloadAvater({ file: uploadFile });

      if (!response?.data?.success) {
        setIsLoading(false);
        setErrorMessage("Failed to upload the avatar. Please try again.");
        return;
      }
      dispatch(updateUserAvatar(response.data.data.avater));
      setIsLoading(false);
    } catch (error) {
   
      setErrorMessage("An error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  console.log(user);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="w-20 h-20 flex justify-center items-center rounded overflow-hidden drop-shadow-lg">
          {user?.avater ? (
            isLoading ? (
              <Loader />
            ) : (
              <img
                src={user?.avater}
                alt={user?.name || "User Avatar"}
                className="h-full w-full object-scale-down"
              />
            )
          ) : (
            <FaUserLarge size={65} />
          )}
        </div>
        <div>
          <h2 className="font-semibold">File Smaller than 5MB</h2>
          <p className="text-gray-400 hidden sm:block">
            This image will appear in the member directory and <br /> on your profile
            page. It will help us recognize you!
          </p>
        </div>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="mt-3">
        <label
          htmlFor="profile"
          className="max-w-[8rem] cursor-pointer text-center text-sm px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-400"
        >
          Change Profile
        </label>
        <input
          type="file"
          id="profile"
          accept="image/*"
          className="hidden"
          // value={file}
          onChange={handleAvatarImage}
        />
      </form>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default Profile;
