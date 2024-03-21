import React, { useEffect, useState, useRef } from "react";
import anime from 'animejs/lib/anime.es.js';
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
import TestAnimation from './TestAnimation'; // Adjust the path based on your file structure


function SectionHome({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const toast = useToast();
  const postsRef = useRef(null);

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

  // Hover effect for delete icon
  const hoverEffect = (e) => {
    anime({
      targets: e.currentTarget,
      scale: 1.2,
      duration: 300
    });
  };

  const leaveEffect = (e) => {
    anime({
      targets: e.currentTarget,
      scale: 1,
      duration: 300
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  useEffect(() => {
    if (postLists.length > 0) {
      requestAnimationFrame(() => {
        anime({
          targets: '.post',
          translateY: [50, 0],
          opacity: [0, 1],
          delay: anime.stagger(100),
          easing: 'easeOutQuad',
        });
      });
    }
  }, [postLists]);

  
  return (
    <>
    <TestAnimation />
   
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} p={5}>
      {postLists.map((post) => (
        <Box
        className="post" // Add class for targeting by Anime.js
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
                onMouseEnter={hoverEffect}
                onMouseLeave={leaveEffect}
                cursor="pointer"
                _hover={{ color: "red.500" }}
              />
            )}
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
    </>
  );
}

export default SectionHome;
