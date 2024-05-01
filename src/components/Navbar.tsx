import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/modules/Navbar.module.scss";
import "../styles/global.scss";
import "../styles/variables.scss";

const homeSvg = "../../public/assets/navbar/moonPhasesMulti/homeMulti.svg";
const aboutSvg = "../../public/assets/navbar/moonPhasesMulti/aboutMulti.svg";
const projectsSvg =
  "../../public/assets/navbar/moonPhasesMulti/projectsMulti.svg";
const contactSvg =
  "../../public/assets/navbar/moonPhasesMulti/contactMulti.svg";
const resumeSvg = "../../public/assets/navbar/moonPhasesMulti/resumeMulti.svg";

// ToDo: style active navItem

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

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className={styles.navbar}>
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""} ${
              hoveredItem && hoveredItem !== item.label
                ? styles.neighborHovered
                : ""
            }`
          }
          onMouseEnter={() => setHoveredItem(item.label)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <img
            src={item.svg}
            alt={item.label}
            className={styles.navItemImg}
          />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
