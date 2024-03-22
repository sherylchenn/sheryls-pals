import React, { useEffect } from 'react';
import {
  Box, SimpleGrid, Heading, Text, Flex, IconButton
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { auth } from "../firebase-config";
import usePosts from '../hooks/usePosts';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import anime from 'animejs/lib/anime.es.js'; // Make sure animejs is installed and imported correctly

function SectionHome({ isAuth }) {
  const { posts, deletePost, hoverEffect, leaveEffect, likePost, likedPosts } = usePosts();

  const categoryColors = {
    School: "green.100",
    Internships: "blue.100",
    "Self-care": "yellow.100",
    Hobbies: "purple.100",
    Tech: "red.100",
    Sports: "orange.100",
    Uncategorized: "gray.100",
  };

  const isPostLikedByUser = (postId) => likedPosts.includes(postId);

  useEffect(() => {
    anime({
      targets: '.welcome-message',
      translateY: [-20, 0], // Slightly move up to down
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: 500,
    });
  }, []);

  return (
    <>
      <Box
  className="welcome-message"
  borderWidth="1px"
  borderRadius="lg"
  overflow="hidden"
  p={5}
  shadow="md"
  bg="teal.100" // Changed background color to a teal shade for distinction
  m={5}
  mt={10} // Added more margin-top for spacing from the top of the page
  textAlign="center"
  fontSize="xl"
  fontFamily="Inconsolata, monospace"
  maxWidth="800px" // Control the maximum width of the box
  mx="auto" // Center the box by setting the left and right margin to auto
>
  Welcome to Sheryl’s Pals! Here, we give musings and advice about school, career, tech, and anything that has been on our minds.
</Box>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} p={5}>
        {posts.map((post) => (
          <Box
            className="post"
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
              mb={4}
              color="black"
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
              <Flex align="center">
                <IconButton
                  aria-label="Like post"
                  icon={isPostLikedByUser(post.id) ? <AiFillHeart color="pink" /> : <AiOutlineHeart />}
                  onClick={() => likePost(post.id)}
                  variant="unstyled"
                />
                <Text ml={2}>{post.likes || 0}</Text>
              </Flex>
              {isAuth && post.author.id === auth.currentUser.uid && (
                <DeleteIcon
                  color="red.500"
                  w={6}
                  h={6}
                  onClick={() => deletePost(post.id)}
                  onMouseEnter={hoverEffect}
                  onMouseLeave={leaveEffect}
                  cursor="pointer"
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
