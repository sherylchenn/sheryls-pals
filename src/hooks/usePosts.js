import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import anime from 'animejs';
import { useToast } from "@chakra-ui/react";
import { db, auth } from "../firebase-config";

const usePosts = (category) => {
  const [posts, setPosts] = useState([]);
  const [initialRender, setInitialRender] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);
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
    if (initialRender && posts.length > 0) {
      anime({
        targets: '.post',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: 'easeOutQuad',
      });
      setInitialRender(false);
    }
  }, [initialRender, posts]);

  // Load liked posts from local storage
  useEffect(() => {
    const savedLikedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    setLikedPosts(savedLikedPosts);
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

  const likePost = async (id) => {
    const user = auth.currentUser;
    if (!user) {
      // User is not authenticated, handle accordingly
      console.log("User is not authenticated.");
      return;
    }
  
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const currentLikes = postSnap.data().likes || 0;
      const likedByUser = likedPosts.includes(id);
  
      let updatedLikedPosts; // Define the variable here
  
      if (likedByUser) {
        updatedLikedPosts = likedPosts.filter(postId => postId !== id);
        setLikedPosts(updatedLikedPosts);
        await updateDoc(postRef, { 
          likes: currentLikes - 1,
          likedBy: postSnap.data().likedBy.filter(userId => userId !== user.uid)
        });
      } else {
        updatedLikedPosts = [...likedPosts, id];
        setLikedPosts(updatedLikedPosts);
        await updateDoc(postRef, { 
          likes: currentLikes + 1,
          likedBy: [...(postSnap.data().likedBy || []), user.uid]
        });
      }
  
      const updatedPosts = posts.map(post => post.id === id ? { ...post, likes: currentLikes + (likedByUser ? -1 : 1) } : post);
      setPosts(updatedPosts);
  
      // Persist likedPosts in localStorage
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
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

  return { posts, deletePost, likePost, hoverEffect, leaveEffect, likedPosts };
};

export default usePosts;
