// src/layouts/Main.jsx

import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { helper as $h } from "@/utils";
import { sideMenu as useSideMenuStore } from "@/stores/side-menu";
import { useRecoilValue } from "recoil";
import { linkTo, nestedMenu, enter, leave } from "./index";
import { Lucide } from "@/base-components";
import logoUrl from "@/assets/logo.png";
import classnames from "classnames";
import TopBar from "@/components/top-bar/Main";
import MobileMenu from "@/components/mobile-menu/Main";
import MainColorSwitcher from "@/components/main-color-switcher/Main";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import SideMenuTooltip from "@/components/side-menu-tooltip/Main";
import CustomTransition from "@/components/CustomTransition/Main"; // Import custom transition

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState([]);
  const sideMenuStore = useRecoilValue(useSideMenuStore);
  const sideMenu = () => nestedMenu($h.toRaw(sideMenuStore.menu), location);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [shouldRenderSwitchers, setShouldRenderSwitchers] = useState(false);

  const toggleSettings = () => {
    if (isSettingsVisible) {
      setIsSettingsVisible(false);
      setTimeout(() => {
        setShouldRenderSwitchers(false);
      }, 500);
    } else {
      setShouldRenderSwitchers(true);
      setTimeout(() => {
        setIsSettingsVisible(true);
      }, 0);
    }
  };

  useEffect(() => {
    dom("body").removeClass("error-page").removeClass("login").addClass("main");
    setFormattedMenu(sideMenu());
  }, [sideMenuStore, location.pathname]);

  return (
    <div className="py-5 md:py-0 -mx-3 px-3 sm:-mx-8 sm:px-8 bg-black/[0.15] dark:bg-transparent">
      <div className="relative">
        <div
          className="fixed bottom-0 right-0 z-50 flex items-center justify-center mb-5 mr-5 text-white rounded-full shadow-lg cursor-pointer h-14 w-14 bg-primary"
          onClick={toggleSettings}
        >
          <Lucide icon="Settings" className="stroke-1.5 w-5 h-5 animate-spin" />
        </div>

        <div
          className={`fixed bottom-0 z-50 mb-5 right-0 flex items-center justify-center space-x-4 transition-all duration-500 ease-in-out ${
            isSettingsVisible ? "opacity-100 right-[90px]" : "opacity-0 translate-x-5"
          }`}
          style={{
            transform: isSettingsVisible ? "translateX(0)" : "translateX(10%)",
            opacity: isSettingsVisible ? "1" : "0",
            right: isSettingsVisible ? "90px" : "0",
          }}
        >
          {shouldRenderSwitchers && (
            <>
              <MainColorSwitcher />
              <DarkModeSwitcher />
            </>
          )}
        </div>
      </div>

      <MobileMenu />
      <div className="flex mt-[4.7rem] md:mt-0 overflow-hidden">
        <nav className="side-nav">
          <Link
            to="/admin"
            className="intro-x flex items-center pl-5 pt-4 mt-3"
          >
            <img
              alt="Tinker Tailwind HTML Admin Template"
              className="w-6 invert"
              src={logoUrl}
            />
            <span className="hidden xl:block text-white text-lg ml-3">
              Admin
            </span>
          </Link>
          <div className="side-nav__devider my-6"></div>
          <ul>
            {formattedMenu.map((menu, menuKey) =>
              menu === "devider" ? (
                <li
                  className="side-nav__devider my-6"
                  key={menu + menuKey}
                ></li>
              ) : (
                <li key={menu + menuKey}>
                  <SideMenuTooltip
                    tag="a"
                    content={menu.title}
                    href={menu.subMenu ? "#" : menu.pathname}
                    className={classnames({
                      "side-menu": true,
                      "side-menu--active": menu.active,
                      "side-menu--open": menu.activeDropdown,
                    })}
                    onClick={(event) => {
                      event.preventDefault();
                      linkTo(menu, navigate);
                      setFormattedMenu($h.toRaw(formattedMenu));
                    }}
                  >
                    <div className="side-menu__icon">
                      <Lucide icon={menu.icon} />
                    </div>
                    <div className="side-menu__title">
                      {menu.title}
                      {menu.subMenu && (
                        <div
                          className={classnames({
                            "side-menu__sub-icon": true,
                            "transform rotate-180": menu.activeDropdown,
                          })}
                        >
                          <Lucide icon="ChevronDown" />
                        </div>
                      )}
                    </div>
                  </SideMenuTooltip>
                  {menu.subMenu && (
                    <CustomTransition
                      in={menu.activeDropdown}
                      onEnter={enter}
                      onExit={leave}
                      timeout={300}
                    >
                      <ul
                        className={classnames({
                          "side-menu__sub-open": menu.activeDropdown,
                        })}
                      >
                        {menu.subMenu.map((subMenu, subMenuKey) => (
                          <li key={subMenuKey}>
                            <SideMenuTooltip
                              tag="a"
                              content={subMenu.title}
                              href={subMenu.subMenu ? "#" : subMenu.pathname}
                              className={classnames({
                                "side-menu": true,
                                "side-menu--active": subMenu.active,
                              })}
                              onClick={(event) => {
                                event.preventDefault();
                                linkTo(subMenu, navigate);
                                setFormattedMenu($h.toRaw(formattedMenu));
                              }}
                            >
                              <div className="side-menu__icon">
                                <Lucide icon="Activity" />
                              </div>
                              <div className="side-menu__title">
                                {subMenu.title}
                                {subMenu.subMenu && (
                                  <div
                                    className={classnames({
                                      "side-menu__sub-icon": true,
                                      "transform rotate-180": subMenu.activeDropdown,
                                    })}
                                  >
                                    <Lucide icon="ChevronDown" />
                                  </div>
                                )}
                              </div>
                            </SideMenuTooltip>
                            {subMenu.subMenu && (
                              <CustomTransition
                                in={subMenu.activeDropdown}
                                onEnter={enter}
                                onExit={leave}
                                timeout={300}
                              >
                                <ul
                                  className={classnames({
                                    "side-menu__sub-open": subMenu.activeDropdown,
                                  })}
                                >
                                  {subMenu.subMenu.map(
                                    (lastSubMenu, lastSubMenuKey) => (
                                      <li key={lastSubMenuKey}>
                                        <SideMenuTooltip
                                          tag="a"
                                          content={lastSubMenu.title}
                                          href={
                                            lastSubMenu.subMenu
                                              ? "#"
                                              : lastSubMenu.pathname
                                          }
                                          className={classnames({
                                            "side-menu": true,
                                            "side-menu--active":
                                              lastSubMenu.active,
                                          })}
                                          onClick={(event) => {
                                            event.preventDefault();
                                            linkTo(lastSubMenu, navigate);
                                          }}
                                        >
                                          <div className="side-menu__icon">
                                            <Lucide icon="Zap" />
                                          </div>
                                          <div className="side-menu__title">
                                            {lastSubMenu.title}
                                          </div>
                                        </SideMenuTooltip>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </CustomTransition>
                            )}
                          </li>
                        ))}
                      </ul>
                    </CustomTransition>
                  )}
                </li>
              )
            )}
          </ul>
        </nav>
        <div className="content">
          <TopBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
