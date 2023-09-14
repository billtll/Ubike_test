import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Ubike95 from "../svgComponents/Ubike95";
import Ubike65 from "../svgComponents/Ubike65";

const NavBar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openNavBar, setOpenNavBar] = useState(false);

  const links = [
    { name: "使用說明", link: "/guidelines" },
    { name: "收費方式", link: "/rate" },
    { name: "站點資訊", link: "/stations-info" },
    { name: "最新消息", link: "/news" },
    { name: "活動專區", link: "/activity" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const svgToRender = windowWidth < 1280 ? <Ubike65 /> : <Ubike95 />;

  return (
    <>
      <nav className="flex items-end fixed top-0 left-0 right-0 h-[72px] bg-white border-b-[1px] border-fourthGray z-[999] xl:h-[104px]">
        <div className="w-full px-8 mx-auto max-w-[1440px] xl:px-[124px]">
          <div className="flex justify-between items-center">
            <Link to="/home">{svgToRender}</Link>
            <div
              className={`absolute left-0 right-0 h-[calc(100vh-72px)] bg-primary p-8 xl:ml-[60px] xl:static xl:flex xl:grow xl:h-auto xl:bg-white xl:p-0 ${
                openNavBar ? "top-[72px]" : "hidden"
              }`}
            >
              <div className="w-full h-full flex flex-col xl:flex-row xl:justify-between xl:items-center">
                <ul className="grow flex flex-col gap-8 xl:flex-row xl:p-0 xl:gap-10">
                  {links.map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.link}
                        className={({ isActive }) =>
                          [
                            "text-[18px] leading-6 noto-sans-tc-500 tracking-[0.18em] xl:tracking-normal transition-colors duration-300",
                            isActive
                              ? "text-secondary xl:text-primary xl:noto-sans-tc-700"
                              : "text-white xl:text-secondary",
                          ].join(" ")
                        }
                        onClick={() => {
                          setOpenNavBar((preState) => !preState);
                        }}
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <Link to="/login">
                  <button
                    type="button"
                    className="py-[10px] px-6 rounded-full text-[16px] leading-5 tracking-[0.1px] noto-sans-tc-400 bg-white text-primary lg:text-[18px] xl:bg-primary xl:text-white"
                  >
                    登入
                  </button>
                </Link>
              </div>
            </div>
            <button
              type="button"
              className="xl:hidden"
              onClick={() => setOpenNavBar((preState) => !preState)}
            >
              {openNavBar ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                    fill="#B5CC22"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 8V6H21V8H3ZM3 13H21V11H3V13ZM3 18H21V16H3V18Z"
                    fill="#B5CC22"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
