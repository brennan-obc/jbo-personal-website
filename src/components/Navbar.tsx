import { NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.scss";

import homeSvg from "../assets/navbar/moonPhases/home.svg";
import aboutSvg from "../assets/navbar/moonPhases/about.svg";
import projectsSvg from "../assets/navbar/moonPhases/projects.svg";
import contactSvg from "../assets/navbar/moonPhases/contact.svg";
import resumeSvg from "../assets/navbar/moonPhases/resume.svg";

const Navbar = () => {
  const navItems = [
    {
      label: "About",
      path: "/about",
      svg: aboutSvg,
      activeSvg: aboutSvg,
    },
    {
      label: "Projects",
      path: "/projects",
      svg: projectsSvg,
      activeSvg: projectsSvg,
    },
    {
      label: "Home",
      path: "/",
      svg: homeSvg,
      activeSvg: homeSvg,
    },
    {
      label: "Resume",
      path: "/resume",
      svg: resumeSvg,
      activeSvg: resumeSvg,
    },
    {
      label: "Contact",
      path: "/contact",
      svg: contactSvg,
      activeSvg: contactSvg,
    },
  ];

  return (
    <nav className={styles.navbar}>
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
          children={({ isActive }) => (
            <>
              <img
                src={isActive ? item.activeSvg : item.svg}
                alt={item.label}
                style={{ width: "75px", height: "75px" }}
              />
              <span>{item.label}</span>
            </>
          )}
        />
      ))}
    </nav>
  );
};

export default Navbar;
