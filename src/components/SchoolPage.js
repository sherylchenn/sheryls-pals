import React from 'react';
import { Box, SimpleGrid, Heading, Text, Flex, Icon } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { auth } from "../firebase-config";
import usePosts from '../hooks/usePosts'; // Ensure this path is correct

function SchoolPage({ isAuth }) {
  // Use the usePosts hook with 'School' category
  const { posts, deletePost, welcomeRef } = usePosts('School');

  const categoryColors = {
    School: "green.100",
    Internships: "blue.100",
    "Self-care": "yellow.100",
    Hobbies: "purple.100",
    Tech: "red.100",
    Sports: "orange.100",
    Uncategorized: "gray.100",
  };

  return (
    <>
      <Box ref={welcomeRef} p={5} textAlign="center" fontSize="xl">
        School 
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} p={5}>
        {posts.map((post) => (
          <Box
            className="post" // Ensure this matches the target in your animejs effects
            key={post.id}
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
    </>
  );
}

export default SchoolPage;
