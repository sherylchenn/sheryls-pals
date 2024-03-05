import React from "react";
import { Box, Flex, Image, Text, Stack, Link } from "@chakra-ui/react";

const SectionHome = () => (
  <Box textAlign="center" p={4}>
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing={4}
      justify="center"
    >
      <Flex
      direction={{ base: "column", md: "row" }} // Stack on small screens, horizontal on medium screens and up
      align="center"
      maxW="4xl"
      mx="auto"
      px={5}
      py={0}
      gap={5} // Add some space between the text and the image
    >
      <Box flex="1" textAlign={{ base: "center", md: "left" }}>
        <Text fontSize="2xl" fontWeight="bold">
          Hi, I'm Sheryl.
        </Text>
        <Text fontSize="md">
          I’m a first-year student studying Computer Science at Stanford
          University. The past year, I have been on a learning journey to know
          myself and hone in on what matters to me. Join me in this
          celebration of life and appreciation of all things good!
        </Text>
        {/* Add more Text components or other content as needed */}
      </Box>
      <Box
        flex="1"
        display="flex" // Ensure the image is centered within the box
        justifyContent={{ base: "center", md: "flex-start" }} // Center on base, align left on md
      >
        <Image
          src={`${process.env.PUBLIC_URL}/styles/images/Home/profile_pic.jpg`} // Ensure the path is correct
          alt="Profile"
          boxSize="150px"
          borderRadius="full"
        />
      </Box>
    </Flex>
      {/* <Link href="https://github.com/sherylchen" isExternal>
        <Image
          src={`${process.env.PUBLIC_URL}/styles/images/Home/github_icon.png`} // Updated path
          alt="GitHub"
          boxSize="40px"
        />
      </Link>
      <Link
        href="https://www.linkedin.com/in/sheryl-chen-489b892a1/"
        isExternal
      >
        <Image
          src={`${process.env.PUBLIC_URL}/styles/images/Home/linkedin_icon.png`} // Updated path
          alt="LinkedIn"
          boxSize="40px"
        />
      </Link>
      <Link href="mailto:sherylcanfly@gmail.com">
        <Image
          src={`${process.env.PUBLIC_URL}/styles/images/Home/email_icon.jpg`} // Updated path
          alt="Email"
          boxSize="40px"
        />
      </Link> */}
    </Stack>
  </Box>
);

export default SectionHome;
