import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { db, storage } from "../firebase";
import { auth } from "../firebase";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { ITweet } from "./timeline";

const Wrapper = styled.div`
  display:flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%; 
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
`;

const AvatarInput = styled.input`
  display: none;
`;

const Name = styled.span`
  font-size: 22px;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState < ITweet[] > ([]);
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);

      setAvatar(avatarUrl);

      await updateProfile(user, {
        photoURL: avatarUrl,
      })
    }
  }

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );

    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map(doc => {
      const { tweet, createdAt, userId, username, photo } = doc.data();

      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });

    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (<AvatarImg src={avatar} />) : (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M406.5 399.6C387.4 352.9 341.5 320 288 320l-64 0c-53.5 0-99.4 32.9-118.5 79.6-35.6-37.3-57.5-87.9-57.5-143.6 0-114.9 93.1-208 208-208s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3l64 0c38.8 0 71.2 27.6 78.5 64.3zM256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" /></svg>)}
      </AvatarUpload>
      <AvatarInput id="avatar" onChange={onAvatarChange} type="file" accept="image/*" />
      <Name>
        {user?.displayName ?? "Anomymous"}
      </Name>
      <Tweets>
        {tweets.map(tweet => <Tweet key={tweet.id} {...tweets} />)}
      </Tweets>
    </Wrapper>
  );
}