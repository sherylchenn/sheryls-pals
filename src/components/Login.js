import React from "react";
import { auth, provider, db } from "../firebase-config";
import { signInWithPopup } from 'firebase/auth';
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Flex, Button, Text, useToast, VStack } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc"; // Make sure you have run 'npm install react-icons'

function Login({ setIsAuth }) {
  let navigate = useNavigate();
  const toast = useToast();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      const userDocRef = doc(db, "approvedUsers", result.user.uid);
      const userDoc = await getDoc(userDocRef);

      // Check if user exists in approvedUsers collection
      if (userDoc.exists() && userDoc.data().approved) {
        // User is approved
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
      } else {
        // User is not approved
        toast({
          title: "Access Denied",
          description: "You are not approved to create posts.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        // Optionally sign the user out again
      }
    }).catch((error) => {
      // Handle errors here
      toast({
        title: "Authentication failed",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  return (
    <Flex
      height="30vh"
      alignItems="center"
      justifyContent="center"
      bg="pastel.pink"
      direction="column" // Aligns children vertically
    >
      <Text fontSize="lg" color="gray.600" mb={4}>
        Only approved users have the ability to create a post.
      </Text>
      <VStack spacing={4}>
        <Button
          leftIcon={<FcGoogle />}
          colorScheme="pink"
          variant="outline"
          size="lg"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      </VStack>
    </Flex>
  );
}

export default Login;