import React, { useEffect, useState } from "react";
import { auth, db } from "/Users/sherylchen/personalsite/src/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { Box, Flex, Menu, MenuButton, MenuList, MenuItem, Button, IconButton } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";


const Header = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();
  const [isApprovedUser, setIsApprovedUser] = useState(false);

  useEffect(() => {
    const checkApproval = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "approvedUsers", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        setIsApprovedUser(userDoc.exists() && userDoc.data().approved);
      }
    };

    if (isAuth) {
      checkApproval();
    }
  }, [isAuth]);

  const goToCategory = (categoryPath) => {
    navigate(`/${categoryPath}`);
  };

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        setIsAuth(false);
        setIsApprovedUser(false);
        localStorage.setItem("isAuth", "false");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  const StyledNavLink = ({ to, children }) => (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        color: 'pink', // your desired color
        textDecoration: isActive ? 'underline' : 'none',
      })}
    >
      {children}
    </NavLink>
  );

  return (
    <Box as="header" bg="pastel.pink" p={4}>
      <Flex as="nav" justify="center" align="center">
        <NavLink to="/" style={{ textDecoration: 'none', color: 'pink.500', marginRight: '2' }}>
          Home
        </NavLink>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost" color="pink.500" _hover={{ bg: 'transparent' }} _active={{ bg: 'transparent' }}>
            Categories
          </MenuButton>
          <MenuList>
            {['school', 'internships', 'self-care', 'hobbies', 'tech', 'sports', 'uncategorized'].map((category) => (
              <MenuItem key={category} onClick={() => goToCategory(category)} color="pink.500">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        {isAuth ? (
          <>
            {isApprovedUser && (
              <NavLink to="/createpost" style={{ textDecoration: 'none', color: 'pink.500', marginRight: '2' }}>
                Create Post
              </NavLink>
            )}
            <Button variant="ghost" color="pink.500" _hover={{ bg: 'transparent' }} _active={{ bg: 'transparent' }} onClick={signUserOut}>
              Log Out
            </Button>
          </>
        ) : (
          <NavLink to="/login" style={{ textDecoration: 'none', color: 'pink.500', marginRight: '2' }}>
            Login
          </NavLink>
        )}
      </Flex>
    </Box>
  );
};

export default Header;