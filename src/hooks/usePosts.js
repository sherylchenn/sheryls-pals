import { useState, useEffect, useRef } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc, getDoc, increment } from 'firebase/firestore';
import anime from 'animejs';
import { useToast } from "@chakra-ui/react";
import { db } from "../firebase-config";

const usePosts = (category) => {
  const [posts, setPosts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      let queryRef = collection(db, "posts");
      if (category) {
        queryRef = query(queryRef, where("category", "==", category));
      }
      const data = await getDocs(queryRef);
      setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    
    fetchPosts();
  }, [category]);

  useEffect(() => {
    if (posts.length > 0) {
      anime({
        targets: '.post',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: 'easeOutQuad',
      });
    }
  }, [posts]);

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

  const likePost = async (id) => {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const currentLikes = postSnap.data().likes || 0;
      await updateDoc(postRef, { likes: currentLikes + 1 });
      toast({
        title: "Post liked.",
        description: "You have liked a post.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // Update the local posts state to reflect the new like count
      setPosts(posts.map(post => post.id === id ? { ...post, likes: currentLikes + 1 } : post));
    } else {
      console.log("Post does not exist!");
    }
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

  return { posts, deletePost, likePost, hoverEffect, leaveEffect };
};

export default usePosts;
