/* import React from 'react';
import { Box, Flex, Image, Text, VStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'Freshman Year at Stanford',
    description: 'What I\'ve been up to until now.',
    coverUrl: `${process.env.PUBLIC_URL}/styles/images/BlogList/blogCover.jpg`, // Updated path
  },
  // ... other posts
];

const BlogList = () => {
  return (
    <Flex justifyContent="center" alignItems="center" mt={8}>
      <VStack spacing={8}>
        {blogPosts.map((post) => (
          <ChakraLink as={Link} to={`/blog/${post.id}`} key={post.id} style={{ textDecoration: 'none' }} _hover={{ textDecoration: 'none' }}>
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
              <Image src={post.coverUrl} alt={post.title} />
              <Box p={4}>
                <Text fontWeight="semibold" fontSize="xl">{post.title}</Text>
                <Text mt={2}>{post.description}</Text>
              </Box>
            </Box>
          </ChakraLink>
        ))}
      </VStack>
    </Flex>
  );
};

export default BlogList;
 */