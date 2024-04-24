import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.scss";

const Navbar = () => {
  const navItems = [
    {
      label: "Home",
      path: "/",
      svg: "src\\assets\\navbar\\150px\\multi\\sm-phase_6.png",
    },
    {
      label: "About",
      path: "/about",
      svg: "src\\assets\\navbar\\150px\\multi\\sm-phase_4.png",
    },
    {
      label: "Projects",
      path: "/projects",
      svg: "src\\assets\\navbar\\150px\\multi\\sm-phase_2.png",
    },
    {
      label: "Contact",
      path: "/contact",
      svg: "src\\assets\\navbar\\150px\\multi\\sm-phase_1.png",
    },
  ];

  return (
    <nav className='navbar'>
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
          style={({ isActive }) => ({
            backgroundImage: `url(${
              isActive ? item.svg.replace(".svg", "-active.svg") : item.svg
            })`,
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
