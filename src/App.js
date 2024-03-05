import React from 'react';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme'; // Ensure this path is correct to your theme.js file
import Header from './components/Header';
import SectionHome from './components/SectionHome';
import Library from './components/Library';
import BlogList from './components/BlogList'; // Import the BlogList component
import BlogPost from './components/BlogPost'; // Import the BlogPost component
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Flex direction="column" minHeight="100vh">
          <Header />
          <Box flex="1" justifyContent="center" mt={40}> {/* Adjust mt value as needed */}
            <Routes>
              <Route path="/" element={<SectionHome />} />
              <Route path="/library" element={<Library />} />
              <Route path="/blog" element={<BlogList />} /> {/* Route for the blog list */}
              <Route path="/blog/:postId" element={<BlogPost />} /> {/* Route for individual blog posts */}
              {/* Add more routes as needed */}
            </Routes>
          </Box>
          <Footer />
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
