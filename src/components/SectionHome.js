import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
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

function SectionHome({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const toast = useToast();

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

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

  const categoryColors = {
    School: "green.100",      // A light green color
    Internships: "blue.100",  // A light blue color
    "Self-care": "yellow.100",// A light yellow color
    Hobbies: "purple.100",    // A light purple color
    Tech: "red.100",          // A light red color
    Sports: "orange.100",     // A light orange color
    Uncategorized: "gray.100",// A light gray color
  };
  
  
  const getCategoryColor = (category) => categoryColors[category.toLowerCase()] || "pastel.gray";
  
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} p={5}>
      {postLists.map((post) => (
        <Box
        key={post.id}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}
        shadow="md"
        bg={categoryColors[post.category] || "gray.100"} // Default to gray.100 if category is not in the map
        fontFamily="Inconsolata, monospace"
      >
          <Heading
            size="lg"
            fontFamily="Karla, sans-serif"
            color="black"
            mb={4}
          >
            {post.title}
          </Heading>
          <Text color="black" mb={4}>
            {post.postText}
          </Text>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="black" fontWeight="bold">
              @{post.author.name}
            </Text>
            {isAuth && post.author.id === auth.currentUser.uid && (
              <Icon
                as={DeleteIcon}
                color="white"
                w={6}
                h={6}
                onClick={() => deletePost(post.id)}
                cursor="pointer"
                _hover={{ color: "red.500" }} // Optional: change icon color on hover
              />
            )}
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default SectionHome;