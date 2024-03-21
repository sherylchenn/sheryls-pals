import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  useToast,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function SchoolPage({ isAuth }) {
  const [posts, setPosts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      const q = collection(db, "posts"); // Assuming you want to fetch all posts, not just "School" category
      const querySnapshot = await getDocs(q);
      setPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchPosts();
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
    setPosts(posts.filter((post) => post.id !== id));
  };

  const categoryColors = {
    School: "green.100",
    Internships: "blue.100",
    "Self-care": "yellow.100",
    Hobbies: "purple.100",
    Tech: "red.100",
    Sports: "orange.100",
    Uncategorized: "gray.100",
  };

  console.log("Current User ID:", auth.currentUser?.uid);
  posts.forEach((post) => {
    console.log(
      `Post ID: ${post.id}, Post Author ID: ${
        post.author.id
      }, Matches Current User: ${post.author.id === auth.currentUser?.uid}`
    );
  });

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
          bg={categoryColors[post.category] || "gray.100"}
          fontFamily="Inconsolata, monospace"
        >
          <Heading
            size="lg"
            fontFamily="Karla, sans-serif"
            mb={2}
            color="black"
          >
            {post.title}
          </Heading>
          <Text color="black" mb={4}>
            {post.postText}
          </Text>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" fontWeight="bold" color="black">
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
                _hover={{ color: "red.500" }}
              />
            )}
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default SchoolPage;
