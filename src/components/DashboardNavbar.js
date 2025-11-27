// src/components/DashboardNavbar.jsx
import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const { user } = useSelector((state) => state.auth);

const handleLogout = () => {
  // ✅ Clear everything from local storage (like token, premium access, etc.)
  localStorage.clear();

  // ✅ Also dispatch Redux logout to reset store state
  dispatch(logoutUser());

  // ✅ Redirect to login
  navigate("/login");
};


  const isAdmin = user?.role === "admin";

  return (
    <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand
          className="fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(isAdmin ? "/admin/dashboard" : "/candidate/dashboard")
          }
        >
          🎯 Exam Simulator
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="dashboard-navbar-nav" />
        <Navbar.Collapse id="dashboard-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {isAdmin ? (
              <>
                <Nav.Link onClick={() => navigate("/admin/dashboard")}>
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/admin/manage-users")}>
                  Manage Users
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => navigate("/dummy-payment")}>
                  Subscription Plans
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/activity")}>
                  My Activity
                </Nav.Link>
              </>
            )}

            <NavDropdown
              title={user?.name || "User"}
              id="user-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={() => navigate("/profile")}>
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="text-danger">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
