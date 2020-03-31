import { Fragment, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Link from "next/link";
import CURRENT_USER_QUERY from "../../graphql/current-user.query";
import Signout from "../Auth/Signout";

const Header = () => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error.message)}</p>;
  }

  const { me } = data;

  return (
    <Navbar color="dark" dark expand="md">
      <Link href="/">
        <NavLink
          style={{ cursor: "pointer", fontSize: "20px" }}
          className="font-weight-bold text-white"
        >
          NextJS GraphQL Hooks Auth
        </NavLink>
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link href="/protected">
              <NavLink style={{ cursor: "pointer" }}>Protected</NavLink>
            </Link>
          </NavItem>
          {!me && (
            <Fragment>
              <NavItem>
                <Link href="/signup">
                  <NavLink style={{ cursor: "pointer" }}>Signup</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/signin">
                  <NavLink style={{ cursor: "pointer" }}>Signin</NavLink>
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link href="/password">
                      <a
                        style={{
                          cursor: "pointer",
                          textDecoration: "none",
                          color: "#212529"
                        }}
                      >
                        Reset password
                      </a>
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Fragment>
          )}
          {me && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {me.username}
              </DropdownToggle>
              <DropdownMenu right>
                <Signout />
                <DropdownItem divider />
                <DropdownItem>
                  <Link href="/password">
                    <a
                      style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "#212529"
                      }}
                    >
                      Reset password
                    </a>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
