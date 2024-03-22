import React from 'react';
import { Box, SimpleGrid, Heading, Text, Flex, IconButton } from "@chakra-ui/react";
import usePosts from '../hooks/usePosts'; // Ensure this path is correct
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Confirm you're using react-icons
import anime from 'animejs/lib/anime.es.js';
import { useEffect } from 'react';

function SchoolPage() {
  // Use the usePosts hook with 'School' category
  const { posts, likePost, likedPosts } = usePosts('School');

  const categoryColors = {
    School: "green.100",
    Internships: "blue.100",
    "Self-care": "yellow.100",
    Hobbies: "purple.100",
    Tech: "red.100",
    Sports: "orange.100",
    Uncategorized: "gray.100",
  };

  // Function to check if a post is liked by the user
  const isPostLikedByUser = (postId) => likedPosts.includes(postId);
  useEffect(() => {
    anime({
      targets: '.post', // Ensure your post boxes have this class for the animation to target
      translateY: [-20, 0], // Moves from slightly above to their normal position
      opacity: [0, 1], // Fades in from transparent to opaque
      easing: 'easeOutExpo',
      duration: 1000,
      delay: anime.stagger(100), // Delays the animation for each subsequent element
    });
  }, []);

  return (
    <>
      <Box p={5} textAlign="center" fontSize="xl">
        School
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} p={5}>
      {posts.map((post) => (
  <Box
    key={post.id}
    className="post"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    p={5}
    shadow="md"
    bg={categoryColors[post.category] || "gray.100"}
  >
    <Heading size="lg" fontFamily="Karla, sans-serif" mb={2} color="black">
      {post.title}
    </Heading>
    <Text color="black" mb={4}>
      {post.postText}
    </Text>
    <Flex justify="space-between" align="center">
      <Text fontSize="sm" fontWeight="bold" color="black">
        @{post.author.name}
      </Text>
      <Flex align="center">
        <IconButton
          aria-label="Like post"
          icon={isPostLikedByUser(post.id) ? <AiFillHeart color="pink" /> : <AiOutlineHeart />}
          onClick={() => likePost(post.id)}
          variant="unstyled"
        />
        {/* Display the like count here */}
        <Text ml={2}>{post.likes || 0}</Text>
      </Flex>
    </Flex>
  </Box>
))}

      </SimpleGrid>
    </>
  );
}

export default SchoolPage;

