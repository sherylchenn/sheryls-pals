import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-config";
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

function TechPage() {
  const [posts, setPosts] = useState([]);
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    toast({
      title: "Post deleted.",
      description: "Your post has been removed.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setPostList(postLists.filter((post) => post.id !== id));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(
        collection(db, "posts"),
        where("category", "==", "Tech")
      );
      const querySnapshot = await getDocs(q);
      setPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Replace this logic with the actual check for the user's role or privileges
    const checkUserAuthorization = () => {
      const user = auth.currentUser;
      if (user) {
        // For example, we check if the user has a role of 'admin' in their profile
        // You might check a different condition based on your app's auth logic
        setIsUserAuthorized(user.role === 'admin');
      }
    };

    checkUserAuthorization();
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
          bg={categoryColors["Tech"]} 
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
            {isUserAuthorized && (
              <Icon
                as={DeleteIcon}
                color="pink.500" // Pink color for the delete icon, adjust as needed
                w={6}
                h={6}
                onClick={() => deletePost(post.id)}
                cursor="pointer"
                _hover={{ color: "red.500" }} // Optional: change icon color on hover
              />
            )}
          </Flex>
          <Text fontSize="sm" fontWeight="bold" color="black">
            @{post.author.name}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default TechPage;