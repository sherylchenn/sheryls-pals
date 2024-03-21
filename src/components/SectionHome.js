import React from 'react';
import {
  Box, SimpleGrid, Heading, Text, Flex, Icon
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { auth } from "../firebase-config";
import usePosts from '../hooks/usePosts';

function SectionHome({ isAuth }) {
  const { posts, deletePost, hoverEffect, leaveEffect, welcomeRef } = usePosts();

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
        Welcome to Sheryl’s Pals! Here, we give musings and advice about school, career, tech and anything that has been on our minds.
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
