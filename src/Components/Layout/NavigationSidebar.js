import {
  CalendarIcon,
  ClipboardListIcon,
  CreditCardIcon,
  CurrencyPoundIcon,
  LockOpenIcon,
  LogoutIcon,
  UserIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
// import { setIsProfileOpen } from "../../services/globalReducer";
// import { defaultUser, setToken, setUser } from "../../services/userReducer";
// import Loader from "../Loader/Loader";
// import Notiflix from "notiflix";
// import { Notify } from "notiflix/build/notiflix-notify-aio";
// import { Confirm } from "notiflix/build/notiflix-confirm-aio";


const NavigationSidebar = ({ mobileHeader = false }) => {
  const router = useRouter();

  const { user, token, loadingUser } = useSelector(
    (state) => state.userContext
  );
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies(["token"]);

  const handleLogout = async () => {
    const loading = toast.loading("Please wait...");
    // expire the token
    if (token) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.log(err.message);
      }
    }

    // delete cookies data
    removeCookie("token", { path: "/" });
    // remove user from reducer
    dispatch(setUser(defaultUser));
    // remove token from reducer
    dispatch(setToken(null));
    router.push("/login");
    toast.dismiss(loading);
    toast.success("Successfully Log out!");
  };

  const unsubscribeMembership = async () => {
    const loading = toast.loading("Please wait...");
    try {
      // get user profile data
      const userResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/unsubscribe`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (userResponse?.data?.user) {
        dispatch(setUser(userResponse?.data?.user));
        toast.dismiss(loading);
        toast.success(userResponse?.data?.message);
      }
    } catch (err) {
      toast.dismiss(loading);
      toast.error(err.message);
    }
  };

  const notify = () => {
    Notiflix.Confirm.show(
      "Cancel Membership",
      "Do you want to cancel your membership ?",
      "Yes",
      "No",
      function okCb() {
        unsubscribeMembership();
      },
      function cancelCb() {},
      {
        width: "320px",
        borderRadius: "8px",
      }
    );
  };


  return (
    <div
      className={`w-full flex flex-col sm:rounded-2xl sm:border border-red-200 sm:shadow-3xl pt-0 ${
        mobileHeader ? "pt-0" : "pt-6"
      }`}
    >
      {/* User information */}
      {loadingUser ? (
        <div className="flex justify-center align-center mx-auto">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col items-center flex-shrink-0 mb-5">
          <div className="w-24 h-24 border border-red-500 rounded-full">
            <Image
              src={`${user?.image || "https://i.ibb.co/S5bzHs0/R5o51PR.png"}`}
              alt=""
              layout="responsive"
              width={200}
              height={100}
              className="inline-block mx-auto object-cover object-center rounded-full"
              objectFit="cover"
              placeholder="blur"
              objectPosition="center"
              blurDataURL="https://i.ibb.co/FmcJYgX/avatar.jpg"
            />
          </div>
          <h2 className="text-2xl mt-2 font-semibold tracking-wide text-red-500 title-font text-center  break-words mx-2">
            {user?.name}
          </h2>
          <p
            className={`text-base my-1 font-medium tracking-wide text-gray-700 title-font text-center break-words  mx-2`}
          >
            {user?.email}
          </p>
        </div>
      )}

      <div className="flex flex-col pl-8">
        <ul className={`flex flex-col ${mobileHeader ? " mx-auto" : ""} `}>
          <li>
            <Link legacyBehavior href="/dashboard">
              <a
                className={`flex flex-row user_nav_items w-max items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-brand-600 hover:text-red-600 text-base font-semibold tracking-wider mb-6 ${
                  router?.pathname === `/dashboard`
                    ? "text-red-600 user_nav_active"
                    : ""
                }`}
                onClick={() => dispatch(setIsProfileOpen(false))}
              >
                <CreditCardIcon
                  className="inline-flex items-center justify-center h-6 w-6 mr-2"
                  aria-hidden="true"
                />
                Dashboard
              </a>
            </Link>
          </li>
          {(user?.member_info == null && user?.user_type=="55" ) && (
            <li>
              <Link legacyBehavior href="/dashboard/make-payment">
                <a
                  className={`flex flex-row user_nav_items w-max items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-brand-600 hover:text-red-600 text-base font-semibold tracking-wider mb-6 ${
                    router?.pathname === `/dashboard/make-payment`
                      ? "text-red-600 user_nav_active"
                      : ""
                  }`}
                  onClick={() => dispatch(setIsProfileOpen(false))}
                >
                  <CurrencyPoundIcon
                    className="inline-flex items-center justify-center h-6 w-6 mr-2"
                    aria-hidden="true"
                  />
                  Make Payment
                </a>
              </Link>
            </li>
          )}

          <li>
            <Link legacyBehavior href="/dashboard/profile">
              <a
                className={`flex flex-row user_nav_items w-max items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-brand-600 hover:text-red-600 text-base font-semibold tracking-wider mb-6 ${
                  router?.pathname === `/dashboard/profile`
                    ? "text-red-600 user_nav_active"
                    : ""
                }`}
                onClick={() => dispatch(setIsProfileOpen(false))}
              >
                <UserIcon
                  className="inline-flex items-center justify-center h-6 w-6 mr-2"
                  aria-hidden="true"
                />
                Profile
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/dashboard/claim-history">
              <a
                className={`flex flex-row user_nav_items w-max items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-brand-600 hover:text-red-600 text-base font-semibold tracking-wider mb-6 ${
                  router?.pathname === `/dashboard/claim-history`
                    ? "text-red-600 user_nav_active"
                    : ""
                }`}
                onClick={() => dispatch(setIsProfileOpen(false))}
              >
                <CalendarIcon
                  className="inline-flex items-center justify-center h-6 w-6 mr-2"
                  aria-hidden="true"
                />
                Claim History
              </a>
            </Link>
          </li>
          {user?.associated_restaurant_id && (
            <li>
              <Link legacyBehavior href="/dashboard/edit-restaurant">
                <a
                  className={`flex flex-row user_nav_items w-max items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-brand-600 hover:text-red-600 text-base font-semibold tracking-wider mb-6 ${
                    router?.pathname === `/dashboard/edit-restaurant`
                      ? "text-red-600 user_nav_active"
                      : ""
                  }`}
                  onClick={() => dispatch(setIsProfileOpen(false))}
                >
                  <ClipboardListIcon
                    className="inline-flex items-center justify-center h-6 w-6 mr-2"
                    aria-hidden="true"
                  />
                  Edit Restaurant
                </a>
              </Link>
            </li>
          )}
          <li>
            <Link legacyBehavior href="/dashboard/referrals">
              <a
                className={`flex flex-row user_nav_items w-max items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-brand-600 hover:text-red-600 text-base font-semibold tracking-wider mb-6 ${
                  router?.pathname === `/dashboard/referrals`
                    ? "text-red-600 user_nav_active"
                    : ""
                }`}
                onClick={() => dispatch(setIsProfileOpen(false))}
              >
                <CalendarIcon
                  className="inline-flex items-center justify-center h-6 w-6 mr-2"
                  aria-hidden="true"
                />
                Referrals
              </a>
            </Link>
          </li>
          {(user?.member_info !== null && user?.user_type=="55") && (
            <li>
              <Link legacyBehavior href="">
                <a
                  className={`flex flex-row user_nav_items w-max items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-brand-600 hover:text-red-600 text-base font-semibold tracking-wider mb-6 ${
                    router?.pathname === `/dashboard/make-payment`
                      ? "text-red-600 user_nav_active"
                      : ""
                  }`}
                  onClick={notify} 
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                  &nbsp;Cancel Membership
                </a>
              </Link>
            </li>
          )}
          <li>
            <Link legacyBehavior href="/change-password">
              <a
                className={`flex flex-row user_nav_items w-max items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-brand-600 hover:text-red-600 text-base font-semibold tracking-wider mb-6 ${
                  router?.pathname === `/change-password`
                    ? "text-red-600 user_nav_active"
                    : ""
                }`}
                onClick={() => dispatch(setIsProfileOpen(false))}
              >
                <LockOpenIcon
                  className="inline-flex items-center justify-center h-6 w-6 mr-2"
                  aria-hidden="true"
                />
                Change Password
              </a>
            </Link>
          </li>
          <li>
            <span
              className={`flex flex-row focus:items-center transform hover:translate-x-3 transition-transform ease-in duration-300 text-brand-600 hover:text-red-600 text-base font-semibold tracking-wider mb-6 cursor-pointer`}
              onClick={handleLogout}
            >
              <LogoutIcon
                className="inline-flex items-center justify-center h-6 w-6 mr-2"
                aria-hidden="true"
              />
              Log out
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationSidebar;
