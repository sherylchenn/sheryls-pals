import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Heading,
  Input,
  Textarea,
  Select,
  Button,
  useToast,
  Container,
} from "@chakra-ui/react";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [category, setCategory] = useState("Uncategorized");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();
  const toast = useToast();

  const createPost = async () => {
    if (!title || !postText) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields before submitting.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await addDoc(postsCollectionRef, {
        title,
        postText,
        category,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error while creating the post.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate, isAuth]);

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={5} width="100%">
        <Heading as="h1" size="xl" fontFamily="Karla" color="pastel.pink">
          Create A Post
        </Heading>
        <Input
          placeholder="Title..."
          onChange={(event) => setTitle(event.target.value)}
          size="md"
          variant="filled"
          sx={{
            "::placeholder": {
              fontFamily: "Inconsolata, monospace",
            },
          }}
        />
        <Select
          placeholder="Select category"
          onChange={(event) => setCategory(event.target.value)}
          variant="filled"
          colorScheme="pink"
        >
          <option value="School">School</option>
          <option value="Internships">Internships</option>
          <option value="Self-care">Self-care</option>
          <option value="Hobbies">Hobbies</option>
          <option value="Tech">Tech</option>
          <option value="Sports">Sports</option>
          <option value="Uncategorized">Uncategorized</option>
        </Select>
        <Textarea
          placeholder="Post..."
          onChange={(event) => setPostText(event.target.value)}
          size="md"
          variant="filled"
          height="200px"
          sx={{
            "::placeholder": {
              fontFamily: "Inconsolata, monospace",
            },
          }}
        />
        <Button
          colorScheme="pink"
          variant="solid"
          onClick={createPost}
          isFullWidth
        >
          Submit Post
        </Button>
      </VStack>
    </Container>
  );
}

export default CreatePost;
