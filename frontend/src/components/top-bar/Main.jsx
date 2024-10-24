import { useState } from "react";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import { useNavigate } from 'react-router-dom';
import Profile from "@/assets/ArifZaid-Profile.jpeg"
import useLogout from "../../hooks/useLogout";

function Main(props) {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const { logout, loading, error } = useLogout(); // Destructure the logout hook

  const handleLogout = () => {
    logout(); // Call the logout function when button is clicked
  };

  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  const navigate = useNavigate();

  const handleNavigationProfile = () => {
    navigate('/admin/update-profile');
  };

  const handleNavigationPassword = () => {
    navigate('/admin/change-password')
  }

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="top-bar">
        {/* BEGIN: Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          className="-intro-x mr-auto hidden sm:flex"
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Application</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Dashboard
            </li>
          </ol>
        </nav>
        {/* END: Breadcrumb */}
        {/* BEGIN: Search */}
        <div className="intro-x relative mr-3 sm:mr-6">
          <div className="search hidden sm:block">
            <input
              type="text"
              id="search-input" // Added id
              name="search" // Added name
              className="search__input form-control border-transparent"
              placeholder="Search..."
              onFocus={showSearchDropdown}
              onBlur={hideSearchDropdown}
            />
            <Lucide
              icon="Search"
              className="search__icon dark:text-slate-500"
            />
          </div>
          <a className="notification sm:hidden" href="">
            <Lucide
              icon="Search"
              className="notification__icon dark:text-slate-500"
            />
          </a>
          <div
            className={classnames({
              "search-result": true,
              show: searchDropdown,
            })}
          >
            <div className="search-result__content">
              <div className="search-result__content__title">Pages</div>
              <div className="mb-5">
                <a href="" className="flex items-center">
                  <div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full">
                    <Lucide icon="Inbox" className="w-4 h-4" />
                  </div>
                  <div className="ml-3">Mail Settings</div>
                </a>
                <a href="" className="flex items-center mt-2">
                  <div className="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full">
                    <Lucide icon="Users" className="w-4 h-4" />
                  </div>
                  <div className="ml-3">Users & Permissions</div>
                </a>
                <a href="" className="flex items-center mt-2">
                  <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full">
                    <Lucide icon="CreditCard" className="w-4 h-4" />
                  </div>
                  <div className="ml-3">Transactions Report</div>
                </a>
              </div>
              <div className="search-result__content__title">Users</div>
              <div className="mb-5">
                {$_.take($f(), 4).map((faker, fakerKey) => (
                  <a key={fakerKey} href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={faker.photos[0]}
                      />
                    </div>
                    <div className="ml-3">{faker.users[0].name}</div>
                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                      {faker.users[0].email}
                    </div>
                  </a>
                ))}
              </div>
              <div className="search-result__content__title">Products</div>
              {$_.take($f(), 4).map((faker, fakerKey) => (
                <a key={fakerKey} href="" className="flex items-center mt-2">
                  <div className="w-8 h-8 image-fit">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="rounded-full"
                      src={faker.images[0]}
                    />
                  </div>
                  <div className="ml-3">{faker.products[0].name}</div>
                  <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                    {faker.products[0].category}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* END: Search  */}
        {/* BEGIN: Notifications */}
        <Dropdown className="intro-x mr-auto sm:mr-6">
          <DropdownToggle
            tag="div"
            role="button"
            className="notification notification--bullet cursor-pointer"
          >
            <Lucide
              icon="Bell"
              className="notification__icon dark:text-slate-500"
            />
          </DropdownToggle>
          <DropdownMenu className="notification-content pt-2">
            <DropdownContent tag="div" className="notification-content__box">
              <div className="notification-content__title">Notifications</div>
              {$_.take($f(), 5).map((faker, fakerKey) => (
                <div
                  key={fakerKey}
                  className={classnames({
                    "cursor-pointer relative flex items-center": true,
                    "mt-5": fakerKey,
                  })}
                >
                  <div className="w-12 h-12 flex-none image-fit mr-1">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="rounded-full"
                      src={faker.photos[0]}
                    />
                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a href="" className="font-medium truncate mr-5">
                        {faker.users[0].name}
                      </a>
                      <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                        {faker.times[0]}
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      {faker.news[0].shortContent}
                    </div>
                  </div>
                </div>
              ))}
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
        {/* END: Notifications  */}
        {/* BEGIN: Account Menu */}
        <Dropdown className="intro-x w-8 h-8">
          <DropdownToggle
            tag="div"
            role="button"
            className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
          >
            <img
              alt="Midone Tailwind HTML Admin Template"
              src={Profile}
            />
          </DropdownToggle>
          <DropdownMenu className="w-56">
            <DropdownContent className="bg-primary text-white">
              <DropdownHeader tag="div" className="!font-normal">
                <div className="font-medium">Arif Zaid P P</div>
                <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                  MERN stack developer
                </div>
              </DropdownHeader>
              <DropdownDivider className="border-white/[0.08]" />
              <DropdownItem className="hover:bg-white/5" onClick={handleNavigationProfile}>
                <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
              </DropdownItem>
              <DropdownItem className="hover:bg-white/5" onClick={handleNavigationProfile}>
                <Lucide icon="Edit" className="w-4 h-4 mr-2" /> Edit Account
              </DropdownItem>
              <DropdownItem className="hover:bg-white/5" onClick={handleNavigationPassword}>
                <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Reset Password
              </DropdownItem>
              <DropdownItem className="hover:bg-white/5">
                <Lucide icon="HelpCircle" className="w-4 h-4 mr-2" /> Help
              </DropdownItem>
              <DropdownDivider className="border-white/[0.08]" />
              <DropdownItem className="hover:bg-white/5" onClick={handleLogout}>
                {/* If loading is true, show spinning Loader icon and 'Logging out...' text, otherwise show ToggleRight icon and 'Logout' text */}
                {loading ? (
                  <>
                    <Lucide className="animate-spin w-5 h-5 text-current" icon="Loader" />
                    Logging out...
                  </>
                ) : (
                  <>
                    <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" />
                    Logout
                  </>
                )}

                {/* If there's an error, display it in red */}
                {error && <span className="text-red-500">{error}</span>}
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
        {/* END: Account Menu */}
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
