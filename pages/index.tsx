import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import FeedCard from "../components/FeedCard";

const Home: NextPage = ({ posts, user }) => {
  return (
    <div>
      <div className="flex justify-center items-center gap-8 my-2">
        <h2 className="text-blue font-bold text-lg">Hello! {user.username}</h2>
        <button className="px-2 py-2 bg-green-600 rounded-lg text-white font-bold hover:bg-green-700">
          Create Post
        </button>
      
        <select
          id="feeds_type"
          className="bg-gray-200 border-green-700 text-gray-900 text-md rounded-lg focus:ring-green-500 focus:border-green-500 block p-2 font-bold"
        >
          <option selected value="all_feed">
            All Feed
          </option>
          <option value="my_feed">My Posts</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {posts.map((post, i) => (
          <FeedCard post={post} key={i} />
        ))}
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  const response = await fetch(
    "https://lamb-backend.herokuapp.com/user/register"
  );
  const data = await response.json();
  return {
    props: { posts: data }, // will be passed to the page component as props
  };
}
export default Home;
