import { NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.scss";
import "../styles/global.scss";
import "../styles/variables.scss";

import homeSvg from "../assets/navbar/moonPhasesMulti/homeMulti.svg";
import aboutSvg from "../assets/navbar/moonPhasesMulti/aboutMulti.svg";
import projectsSvg from "../assets/navbar/moonPhasesMulti/projectsMulti.svg";
import contactSvg from "../assets/navbar/moonPhasesMulti/contactMulti.svg";
import resumeSvg from "../assets/navbar/moonPhasesMulti/resumeMulti.svg";

const Navbar = () => {
  const navItems = [
    {
      label: "ABOUT",
      path: "/about",
      svg: aboutSvg,
      activeSvg: aboutSvg,
    },
    {
      label: "PROJECTS",
      path: "/projects",
      svg: projectsSvg,
      activeSvg: projectsSvg,
    },
    {
      label: "HOME",
      path: "/",
      svg: homeSvg,
      activeSvg: homeSvg,
    },
    {
      label: "RESUME",
      path: "/resume",
      svg: resumeSvg,
      activeSvg: resumeSvg,
    },
    {
      label: "CONTACT",
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
