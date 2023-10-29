import toast from "react-hot-toast";

const userSingInSignUpSuccess = async(result) => {
    if (result && result?.data?.success) {
        toast.success(result?.data?.message);
      }
};

export default userSingInSignUpSuccess;