import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../contexts/AuthContext";
import {
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
const Home = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const { user, isLoggedIn } = authInfo;
  const [dataUser, setDataUser] = useState();
  const [posts, setPosts] = useState([]);
  // const [content, setContent] = useState("");
  const [contentMap, setContentMap] = useState({});
  const [postID, setPostID] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/user/${user.name}`);
        if (response.ok) {
          const data = await response.json();
          setDataUser(data);
        } else {
          console.error("Failed to fetch user");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/posts/");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPosts();
  }, []);
  const handleCreatePostClick = () => {
    if (isLoggedIn) {
      navigate("/create-post");
    } else {
      alert("Cannot create post. User is not logged in.");
    }
  };
  const handleContentChange = (postId) => (e) => {
    const newContentMap = { ...contentMap, [postId]: e.target.value };
    setContentMap(newContentMap);
    setPostID(postId);
    console.log(contentMap);
  };
  const handleSubmit = async (e) => {
    const content = contentMap[postID];
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: content,
          user_id: dataUser.id,
          post_id: postID,
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Failed to create comment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-100 overflow-y-auto ">
      <Header />
      <div className="w-3/5 flex mt-4 mx-auto ">
        <div className="main-view-page w-2/3 mr-10">
          <div className="sticky z-10 top-[72px]">
            <div className="h-14 bg-white p-2 mb-4 flex">
              <img src="/social-media.png" alt="icon" className="mx-2"></img>
              <button
                style={{ borderRadius: "0px" }}
                className="w-full border border-gray-300 text-gray-400 flex items-center p-2"
                onClick={handleCreatePostClick}
              >
                Create Post
              </button>
            </div>
          </div>

          <div className="filter bg-white py-2 sticky top-[144px] z-10">
            <div className="flex ml-10">
              <div className="mr-2">
                <button className="bg-[#eeeeee] flex items-center justify-center">
                  <img src="/star.png" alt="Star" className="mr-2"></img>Best
                </button>
              </div>
              <div className="mr-2">
                <button className="flex items-center justify-center">
                  <img src="/fire.png" alt="Fire" className="mr-2"></img>Hot
                </button>
              </div>
              <div className="mr-2">
                <button className="flex items-center justify-center">
                  <img src="/thunder.png" alt="Thunder" className="mr-2"></img>
                  New
                </button>
              </div>
              <div>
                <button className="flex items-center justify-center">
                  <img src="/up.png" alt="Up" className="mr-2"></img>Top
                </button>
              </div>
            </div>
          </div>
          {posts.map((post) => (
            <div key={post.id} className="post-view bg-white mt-4 z-0">
              <div className="h-[60vh] p-4 pb-4">
                <div className="header-post flex items-center h-[10%]">
                  <div className="user-icon mr-2">
                    <img
                      src="/social-media.png"
                      alt="icon"
                      width={20}
                      height={20}
                    ></img>
                  </div>
                  <div className="user-name font-medium text-base mr-2">
                    <div>{post.user.name}</div>
                  </div>
                  <div className="time-post font-light text-xs mr-2">
                    {/* <div>Posted at {post.created_at}</div> */}
                    <div>
                      Posted at {formatDistanceToNow(new Date(post.created_at))}{" "}
                      ago
                    </div>
                  </div>
                  <div className="post-tag flex mr-2">
                    {post.post_tag?.map((tag) => (
                      <div
                        key={tag.id}
                        className="tag text-xs mr-1 border border-gray-200 p-1 rounded-lg bg-neutral-700 text-white"
                      >
                        {tag.tag.name}
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <button><EditOutlined/></button>
                    <button><DeleteOutlined/></button>
                  </div>
                </div>
                <div className="content-post h-[60%] flex">
                  <div className="w-[5%] mr-6 flex justify-center font-bold">
                    +{post.post_vote?.length ?? 0}
                  </div>
                  <div className="w-[85%]">
                    <div className="post-title font-bold mb-1">
                      {post.title}
                    </div>
                    <div className="description mb-1">{post.description}</div>
                    <div className="image mb-1">{post.image}</div>
                    <div className="comment flex">
                      <img src="/cmt.png"></img>
                      <span className="ml-2">
                        {post.comments?.length ?? 0} Comments
                      </span>
                    </div>
                  </div>
                </div>
                <div className="comment-post h-[30%] flex">
                  <div className="border-l-2 border-gray-400">
                    {post.comments?.map((comment) => (
                      <div key={comment.id} className="comment-item ml-4">
                        <div className="comment header flex">
                          <div className="mr-2">
                            <img
                              src="/social-media.png"
                              alt="cmt icon"
                              width={32}
                              height={32}
                            ></img>
                          </div>
                          <div className="flex items-center justify-center font-bold">
                            {comment.user.name}
                          </div>
                          <div className="mr-2 ml-2 font-light text-xs flex items-center justify-center">
                            {formatDistanceToNow(new Date(comment.created_at))}{" "}
                            ago
                          </div>
                        </div>
                        <div className="comment content mr-2 border-dotted border-l-2 border-gray-400 pl-4">
                          {comment.content}
                        </div>
                        <div className="vote font-bold">
                          {post.comments.comment_vote?.length ?? 0}
                        </div>
                      </div>
                    ))}
                    <div className="text comment flex mt-4 ml-4">
                      <img
                        src="/social-media.png"
                        alt="cmt icon"
                        width={32}
                        height={32}
                      ></img>
                      <input
                        type="text"
                        key={post.id}
                        className="p-1 border border-gray-400 mx-2 rounded-lg w-[60vh]"
                        placeholder="Send message"
                        id={post.id}
                        value={contentMap[post.id] || ''}
                        onChange={handleContentChange(post.id)}
                      ></input>
                      <button
                        style={{ height: "32px" }}
                        className="flex items-center"
                        onClick={handleSubmit}
                      >
                        <img src="/send.png" alt="send cmt"></img>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="recent-post w-1/3 bg-white p-4 h-screen">
          <div>
            <p className="font-bold text-black">RECENT POST</p>
          </div>
          {isLoggedIn && (
            <div>
              {posts.map((post) => (
                <div key={post.id} className="post-item flex mt-4 h-[15vh]">
                  <div className="">
                    <div className="flex">
                      <img src="/social-media.png" alt="user icon" width={24} height={24}></img>
                      <div className="ml-2">{post.user.name}</div>
                    </div>
                    <div className="mt-1">
                      <div className="font-bold">{post.title}</div>
                      <div className="truncate w-[250px]">{post.description}</div>
                      <div className="flex justify-end">
                        <div className="text-xs mr-1">{post.comments?.length ?? 0} Comments - </div>
                        <div className="text-xs">Posted at {formatDistanceToNow(new Date(post.created_at))}{" "}
                        ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              }
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};
export default Home;
