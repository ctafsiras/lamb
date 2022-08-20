// import type { NextPage } from "next";
import { useEffect, useState } from "react";
import FeedCard from "../components/FeedCard";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import toast from "react-hot-toast";

const Home = ({ allPosts }) => {
  const [modal, setModal] = useState(false);
  const [post, setPost] = useState('');
  const [allPost, setAllPost] = useState(true);
  const router = useRouter()
  let myId = Cookies.get('myId')

  const [me, setMe] = useState({});
  useEffect(() => {

    async function load() {
      if (!myId) {
        router.push('/register');
      }
      else {
        const response = await fetch(`https://lamb-backend.herokuapp.com/backend/get-user/${myId}`);
        const data = await response.json();
        setMe(data);
      }
    }
    load();
  }, [myId])
  const handleCreate = async () => {
    const newPost = { postDetails: post, lastStatus: "UNSOLVED", userFK: myId }
    const res = await fetch('https://lamb-backend.herokuapp.com/backend/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
    const data = await res.json();
    toast.success('Successfully Created, Please Refresh')
    setPost('')
    setModal(false);
  }


  return (
    <div>
      <div className="flex justify-center items-center gap-8 my-2">
        <h2 className="text-green font-bold text-lg">Hello! {me?.username}</h2>
        <button onClick={() => setModal(true)} className="px-2 py-2 bg-green-600 rounded-lg text-white font-bold hover:bg-green-700">Create Post</button>
        <select
          onChange={(e) => setAllPost(e.target.value === "my_feed" ? false : true)}
          id="feeds_type"
          className="bg-gray-200 border-green-700 text-gray-900 text-md rounded-lg focus:ring-green-500 focus:border-green-500 block p-2 font-bold">
          <option defaultValue="all_feed">All Feed</option>
          <option value="my_feed">My Posts</option>
        </select>
      </div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-12">
            {allPost ?
              allPosts.map((post, i) => (
                <FeedCard myId={myId} post={post} key={i} />
              ))
              :
              allPosts.map((post, i) => (
                post.userFK === parseInt(myId) && <FeedCard myId={myId} post={post} key={i} />
              ))
            }
          </div>
        </div>
      </section>
      {/* <!-- Main modal --> */}
      <div id="defaultModal" tab-index="-1" aria-hidden="true" className={`${!modal && 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}>
        <div className="relative p-4 w-full mx-auto max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-start p-4 rounded-t border-b ">
              <h3 className="text-xl font-semibold text-gray-900 ">Create New Post</h3>
              <button onClick={() => setModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="defaultModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">
              <textarea value={post} onChange={(e) => setPost(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your post..."></textarea>
            </div>
            {/* <!-- Modal footer --> */}
            <div onClick={handleCreate} className="flex flex-row-reverse items-center p-6 space-x-2 rounded-b border-t border-gray-200">
              <button data-modal-toggle="defaultModal" type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  const data = await (await fetch("https://lamb-backend.herokuapp.com/backend/get-all-post")).json();
  return {
    props: { allPosts: data },
  };

}

export default Home;
