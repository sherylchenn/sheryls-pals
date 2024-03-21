import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import anime from 'animejs';
import { useToast } from "@chakra-ui/react";
import { db, auth } from "../firebase-config";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const toast = useToast();
  const welcomeRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollectionRef = collection(db, "posts");
      const data = await getDocs(postsCollectionRef);
      setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      requestAnimationFrame(() => {
        anime({
          targets: '.post',
          translateY: [50, 0],
          opacity: [0, 1],
          delay: anime.stagger(100),
          easing: 'easeOutQuad',
        });
      });
    }
  }, [posts]);

  useEffect(() => {
    anime({
      targets: welcomeRef.current,
      translateY: [-100, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 2000,
    });
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    toast({
      title: "Post deleted.",
      description: "Your post has been removed.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setPosts(posts.filter(post => post.id !== id));
  };

  const hoverEffect = (e) => {
    anime({
      targets: e.currentTarget,
      scale: 1.2,
      duration: 300
    });
  };

  const leaveEffect = (e) => {
    anime({
      targets: e.currentTarget,
      scale: 1,
      duration: 300
    });
  };
  return { posts, deletePost, hoverEffect, leaveEffect, welcomeRef };

};
export default usePosts;