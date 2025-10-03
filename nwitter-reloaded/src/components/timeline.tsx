import { useEffect, useState } from "react";
import { db } from "../firebase";
import styled from "styled-components";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Tweet from "./tweet";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

export default function Timeline() {
  const [tweets, setTweets] = useState < ITweet[] > ([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25),
      );

      // const snapshot = await getDocs(tweetsQuery);
      // const tweets = snapshot.docs.map((doc) => {
      //   const { tweet, photo, userId, username, createdAt } = doc.data();

      //   return {
      //     tweet,
      //     photo,
      //     userId,
      //     username,
      //     createdAt,
      //     id: doc.id,
      //   }
      // });

      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweetsData = snapshot.docs.map((doc) => {
          const { tweet, photo, userId, username, createdAt } = doc.data();

          return {
            tweet,
            photo,
            userId,
            username,
            createdAt,
            id: doc.id,
          };
        });
        setTweets(tweetsData);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    }
  }, []);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  )
}