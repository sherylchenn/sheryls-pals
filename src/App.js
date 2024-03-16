import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import theme from "./theme"; // Ensure this path is correct to your theme.js file
import Header from "./components/Header";
import SectionHome from "./components/SectionHome";
import Home from './components/SectionHome'; // Your home page component
import Library from "./components/Library";
import BlogList from "./components/BlogList"; // Import the BlogList component
import BlogPost from "./components/BlogPost"; // Import the BlogPost component
import CreatePost from "./components/CreatePost";
import InternshipsPage from './components/InternshipsPage'; // Component for Internships category
import SelfCarePage from './components/SelfCarePage';
import SchoolPage from './components/SchoolPage';
import TechPage from './components/TechPage';
import SportsPage from './components/SportsPage'; // Component for School category
import HobbiesPage from './components/HobbiesPage'; // Component for Internships category
import UncategorizedPage from './components/UncategorizedPage';
import Login from "./components/Login";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user); // Set to true if user is not null, otherwise false
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Flex direction="column" minHeight="100vh">
          <Header isAuth={isAuth} setIsAuth={setIsAuth} />
          <Box flex="1" justifyContent="center" mt={40}>
            {" "}
            <Routes>
              <Route path="/" element={<SectionHome isAuth={isAuth} />} />
              <Route path="/library" element={<Library />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
              <Route
                path="/createpost"
                element={<CreatePost isAuth={isAuth} />}
              />
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
              <Route path="/" element={<Home />} />
              <Route path="/school" element={<SchoolPage />} />
              <Route path="/internships" element={<InternshipsPage />} />
              <Route path="/self-care" element={<SelfCarePage />} />
              <Route path="/sports" element={<SportsPage />} />
              <Route path="/hobbies" element={<HobbiesPage />} />
              <Route path="/uncategorized" element={<UncategorizedPage />} />
              <Route path="/tech" element={<TechPage />} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
