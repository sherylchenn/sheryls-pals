// components/BlogPost.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";

const BlogPost = () => {
  // Dummy image data
  const renderImagesWithCaptions = (images) => (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      {images.map((image) => (
        <Box key={image.id} textAlign="center">
          <Image
            src={image.src}
            alt={image.alt}
            maxH="400px"
            objectFit="cover"
            mx="auto"
          />
          <Text fontSize="sm" color="gray.500">
            {image.caption}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );

  const food = [
    {
      id: "steam", // A unique identifier for the image
      src: process.env.PUBLIC_URL + "/styles/images/BlogPost1/Steam.jpg",
      alt: "Photo of dim sum from the restaurant Steam",
      caption: "Steam on University Avenue",
    },
    {
      id: "pacific catch", // A unique identifier for the image
      src:
        process.env.PUBLIC_URL + "/styles/images/BlogPost1/pacific_catch.jpg",
      alt: "Photo of sushi spread from the restaurant Pacific Catch",
      caption: "Pacific Catch in Stanford Shopping Mall",
    },
    {
      id: "rara", // A unique identifier for the image
      src: process.env.PUBLIC_URL + "/styles/images/BlogPost1/rara.jpg",
      alt: "Photo of Nepalese food from Rara restaurant.",
      caption: "Rara on California Avenue",
    },
    {
      id: "araki", // A unique identifier for the image
      src: process.env.PUBLIC_URL + "/styles/images/BlogPost1/araki.jpg",
      alt: "Photo of sushi from Araki Sushi restaurant.",
      caption: "Araki Sushi on University Avaneue",
    },
  ];
  const sunsets = [
    {
      id: "sunset1", // A unique identifier for the image
      src: process.env.PUBLIC_URL + "/styles/images/BlogPost1/sunset1.jpg",
      alt: "Photo of sunset",
    },
    {
      id: "sunset2", // A unique identifier for the image
      src: process.env.PUBLIC_URL + "/styles/images/BlogPost1/sunset2.jpg",
      alt: "Photo of sunset",
      caption:
        "I propose that we give the Stanford sunset a name for when she makes her appearances!",
    },
  ];
  const dish = [
    {
      id: "dish_hike2", // A unique identifier for the image
      src: process.env.PUBLIC_URL + "/styles/images/BlogPost1/dish_hike2.jpg",
      alt: "Photo of tarantula spotted walking out of the Dish",
      caption: "We spotted a tarantula on our way out of the Dish",
    },
  ];
  const big_game = [
    {
      id: "big_game1", // A unique identifier for the image
      src: process.env.PUBLIC_URL + "/styles/images/BlogPost1/big_game1.jpg",
      alt: "dfdfdf",
      caption: "Poor bear :(",
    },
    {
      id: "big_game2", // A unique identifier for the image
      src: process.env.PUBLIC_URL + "/styles/images/BlogPost1/big_game2.jpg",
      alt: "dfdfdf",
      caption: "Endless Berkeley slander",
    },
  ];

  return (
    <Flex direction="column" align="center" maxW="4xl" mx="auto" px={5} py={0}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          My First Year at Stanford University
        </Text>
        <Text as="p">
          I’m a first-year student studying Computer Science at Stanford
          University. The past year I have been on a learning journey to know
          myself and hone in on what matters to me. Join me in this celebration
          of life and appreciation of all things good!
        </Text>
        {/* Map through images and render them with captions */}

        <Text as="p">
          Where to begin! For brevity, we can start with Freshman Fall Quarter
          2023. College has been an adjustment from high school’s rigid schedule
          but that has made it all the more thrilling...
        </Text>

        {renderImagesWithCaptions(food)}
        <Text as="p">
          Stanford is lucky to have such a beautiful campus. If you ever see me
          stopped in the middle of the unforgiving traffic of Jane Stanford Way,
          just know that a bomb sunset photo will likely come out of it.
        </Text>
        {renderImagesWithCaptions(sunsets)}
        <Text as="p">
          Off campus is equally as breathtaking. If you ever want to feel a
          sense of deep achievement on a Sunday morning, wake up early and hike
          the dish. By the time you make it back for brunch everyone will have
          just been waking up and you can boast your excursion. If you’re lucky,
          you’ll catch a rainbow (or the pouring rain).
        </Text>

        <Flex justifyContent="center" alignItems="center" my={5}>
        <Box width={["100%", null, "50%"]} padding={2}>
          <video controls width="100%">
            <source
              src={`${process.env.PUBLIC_URL}/styles/images/BlogPost1/dish_hike1.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Box>
        <Box width={["100%", null, "50%"]} padding={2}>
          {dish.map((image) => (
            <Box key={image.id} textAlign="center">
              <Image src={image.src} alt={image.alt} maxWidth="100%" />
              <Text fontSize="sm" color="gray.500">
                {image.caption}
              </Text>
            </Box>
          ))}
        </Box>
      </Flex>
        <Text as="p">
          “See you at the Big Game!” Was a running joke among Berkeley and
          Stanford admits at my high school. Our first Big Game fell on November
          18th this academic year, and the festivities were day long. Cal did
          not in fact beat us, but we’ll get them next year!
        </Text>
        {renderImagesWithCaptions(big_game)}
        <Text as="p">
          Those were some snapshots of what I’ve been up to Freshman year. More
          to come!
        </Text>
      </VStack>
    </Flex>
  );
};

export default BlogPost;
