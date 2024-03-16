import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "/Users/sherylchen/personalsite/src/firebase-config";
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  IconButton,
  useToast,
  Flex,
  Icon
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function SportsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), where("category", "==", "Sports"));
      const querySnapshot = await getDocs(q);
      setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchPosts();
  }, []);

  const categoryColors = {
    School: "green.100",      // A light green color
    
    
    Internships: "blue.100",  // A light blue color
    "Self-care": "yellow.100",// A light yellow color
    Hobbies: "purple.100",    // A light purple color
    Tech: "red.100",          // A light red color
    Sports: "orange.100",     // A light orange color
    Uncategorized: "gray.100",// A light gray color
  };
  
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} p={5}>
      {posts.map((post) => (
        <Box
          key={post.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={5}
          shadow="md"
          bg={categoryColors["Sports"]} 
          fontFamily="Inconsolata, monospace"
        >
          <Flex justify="space-between" align="center">
            <Box flex="1">
              <Heading size="lg" fontFamily="Karla, sans-serif" mb={2} color="black">
                {post.title}
              </Heading>
              <Text color="black" mb={4}>
                {post.postText}
              </Text>
            </Box>
            {/* Ensure the delete icon is only shown to authorized users */}
            <Icon
              as={DeleteIcon}
              color="pink.500" // Pink color for the delete icon, adjust as needed
              w={6}
              h={6}
              cursor="pointer"
              _hover={{ color: "pink.600" }} // Adjust hover color as needed
            />
          </Flex>
          <Text fontSize="sm" fontWeight="bold" color="black">
            @{post.author.name}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default SportsPage;