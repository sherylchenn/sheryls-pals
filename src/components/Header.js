import React from 'react';
import { Box, Link, Stack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <Box as="header" bg="pastel.pink" p={4}>
    <nav>
    <Stack direction="row" spacing={4} justify="center">
    <NavLink to="/" activeClassName="active">Home</NavLink>
      <NavLink to="/library" activeClassName="active">Library</NavLink>
      <NavLink to="/blog" activeClassName="active">BlogList</NavLink>
      </Stack>
    </nav>
  </Box>
);

export default Header;
