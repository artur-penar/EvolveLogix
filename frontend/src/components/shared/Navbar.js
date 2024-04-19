import { Link, NavLink } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsUserAuthenticated } from "features/users/user";
import { logout } from "features/users/user";
import { Dropdown } from "react-bootstrap";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const authLinks = (
    <>
      <Dropdown as="li" className="nav-item">
        <Dropdown.Toggle as={NavLink} className="nav-link" to="/dashboard">
          Dashboard
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={NavLink} to="/strength-records">
            Strength records
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown as="li" className="nav-item">
        <Dropdown.Toggle as={NavLink} className="nav-link" to="/training-cycle">
          Training cycle
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={NavLink} to="/strength-records">
            Create
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown as="li" className="nav-item">
        <Dropdown.Toggle as={NavLink} className="nav-link" to="/training-log">
          Training log
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={NavLink} to="/view-logs">
            View Logs
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/add-log">
            Add training session
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/edit-log">
            Edit training session
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <li className="nav-item">
        <NavLink className="nav-link" to="/" onClick={() => dispatch(logout())}>
          Logout
        </NavLink>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          EvolveLogix
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
