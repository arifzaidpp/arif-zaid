import { Notification, Lucide } from "@/base-components";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/logo.png";
import illustrationUrl from "@/assets/images/illustration.svg";
import { useEffect, useRef, useState } from "react";
import useLogin from "../../hooks/useLogin";

function Main() {

  const basicNonStickyNotification = useRef();
  
  const basicNonStickyNotificationToggle = () => {
    basicNonStickyNotification.current.showToast();
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState('');
  const { login, loading, error } = useLogin();

  const handleLogin = () => {
    if (!email || !password) {
      setInputError('Please fill in all fields');
      return;
    }

    if (email.length < 5) {
      setInputError('Username/Email must be at least 5 characters long');
      return;
    }

    if (password.length < 8) {
      setInputError('Password must be at least 8 characters long');
      return;
    }

    setInputError('');
    login(email, password);
  };

  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  useEffect(() => {
    if (error) {
      setInputError(error);
    }
  }, [error]);


  return (
    <>
      <div>
        <DarkModeSwitcher />
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Basic Non Sticky Notification Content */}
            <Notification
              getRef={(el) => {
                basicNonStickyNotification.current = el;
              }}
              options={{
                duration: 3000,
              }}
              className="flex flex-col sm:flex-row"
            >
              <div className="font-medium">
                Sorry, You are not allowed to create an account!
              </div>
            </Notification>
            {/* END: Basic Non Sticky Notification Content */}
            {/* BEGIN: Login Info */}
            <div className="hidden xl:flex flex-col min-h-screen">
              <a href="" className="-intro-x flex items-center pt-5">
                <img
                  alt="Admin"
                  className="w-6 invert"
                  src={logoUrl}
                />
                <span className="text-white text-lg ml-3"> Admin </span>
              </a>
              <div className="my-auto">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="-intro-x w-1/2 -mt-16"
                  src={illustrationUrl}
                />
                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                  A few more clicks to <br />
                  sign in to your account.
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                  Manage all your account details in one place
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                  Sign In
                </h2>
                <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                  A few more clicks to sign in to your account. Manage all your
                  e-commerce accounts in one place
                </div>
                <div className="intro-x mt-8">
                  <input
                    type="text"
                    className="intro-x login__input form-control py-3 px-4 block"
                    placeholder="Username Or Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update the email state on change
                  />
                  <input
                    type="password"
                    className="intro-x login__input form-control py-3 px-4 block mt-4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update the password state on change
                  />
                </div>
                {/* Display error message */}
                {inputError && <div className="text-danger mt-2">{inputError}</div>}
                <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                  <div className="flex items-center mr-auto">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="form-check-input border mr-2"
                    />
                    <label
                      className="cursor-pointer select-none"
                      htmlFor="remember-me"
                    >
                      Remember me
                    </label>
                  </div>
                  <a>Forgot Password?</a>
                </div>
                <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                  <button
                    className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                    onClick={handleLogin} // Trigger handleLogin on click
                  >
                    {loading ? <Lucide className="animate-spin w-5 h-5 text-current" icon="Loader" /> : 'Login'}
                  </button>
                  <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top" onClick={basicNonStickyNotificationToggle}>
                    Register
                  </button>
                </div>
                <div className="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left">
                  By signin up, you agree to our
                  <a className="text-primary dark:text-slate-200" href="">
                    Terms and Conditions
                  </a>
                  &
                  <a className="text-primary dark:text-slate-200" href="">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
