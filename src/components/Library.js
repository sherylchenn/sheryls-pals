/* import React from "react";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";

// Dummy data for books, with updated image paths
const books = [
  {
    id: 1,
    title: "Flourish",
    coverUrl: process.env.PUBLIC_URL + "/styles/images/Library/flourish.jpg", // Updated path
  },
  // ... more books
];

const Library = () => {
  return (
    <Flex justifyContent="center" alignItems="center" mt={8}>
      <VStack spacing={8}>
        {books.map((book) => (
          <Box
            key={book.id}
            maxW="xl"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
          >
            <Image src={book.coverUrl} alt={book.title} />
            <Box p={4}>
              <Text fontWeight="semibold" fontSize="xl">
                {book.title}
              </Text>
              <Text mt={2}>
                On Optimism: Seligman’s positive psychology showed me that a lot
                of the thought patterns I might’ve perceived of as beneficial or
                characteristic of a high-achieving person were actually causing
                setback. Seligman's concept of explanatory style—the way we
                interpret life's events—fundamentally changed how I strive to
                perceive events. The distinction between viewing adversity as
                temporary (optimistic) versus permanent (pessimistic) defines
                whether or not I take action to reverse harm. From a purely
                practical standpoint, the time spent catastrophizing over an
                event only takes away time and energy from what could be a
                productive solution. Something that stood out to me from
                “Flourish” was the "Ehrenreich error," referring to a failure to
                differentiate between optimism that can influence reality
                (reflexive) and optimism that cannot (non reflexive). A major
                critique of optimism is that it creates a false sense of
                security. But Seligman notes that pessimism is what causes the
                economic meltdown, not optimism. When investors feel positive
                about a borrower's capacity to pay back a loan, the value of
                that loan increases. The capacity of the borrower to repay, too,
                is based on perception, such as whether the bank decides to
                seize the property and the interest rate applied to the loan.
                I’ve always erred on the side of caution, but I’ve started to
                think more about when this caution is actually hindering my
                chances of success. Self-efficacy, I’ve learned, can get you
                far.
              </Text>
            </Box>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
};

export default Library;
 */