import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../contexts/AuthContext";
import {
  DeleteOutlined,
  EditOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
const Home = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const { user, isLoggedIn } = authInfo;
  const [dataUser, setDataUser] = useState();
  const [posts, setPosts] = useState([]);
  const [contentMap, setContentMap] = useState({});
  const [postID, setPostID] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/user/${user?.name}`
        );
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
    if (isLoggedIn === false) {
      alert("Cannot create comment. User is not logged in.");
      return;
    }
    const content = contentMap[postID];
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          user_id: dataUser.id,
          post_id: postID,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to create comment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditClick = (postId) => {
    navigate(`/update-post/${postId}`);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setConfirmDelete(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setConfirmDelete(false);
  };
  const handleDelete = async (postId) => {
    showModal();
    if (!confirmDelete) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Post deleted successfully");
        window.location.reload(true)
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [sortCriteria, setSortCriteria] = useState("best");
  const handleSortClick = (criteria) => {
    setSortCriteria(criteria);
  };
  const handleVote = async (postId) => {
    if(!isLoggedIn) {
      alert("Cannot vote post. User is not logged in.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/post_vote/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: dataUser.id,
          post_id: postId,
        }),
      });
      if (response.ok) {
        window.location.reload(true)
      } else {
        console.error("Failed to vote");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleCommentVote = async (commentId) => {
    if(!isLoggedIn) {
      alert("Cannot vote comment. User is not logged in.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/comment_vote/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: dataUser.id,
          comment_id: commentId,
        }),
      });
      if (response.ok) {
        window.location.reload(true)
      } else {
        console.error("Failed to vote comment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const sortPosts = (posts) => {
    switch (sortCriteria) {
      case "best":
        return posts.sort((a, b) => b.id - a.id);
      case "hot":
        return posts.sort((a, b) => b.post_vote?.length - a.post_vote?.length);
      case "new":
        return posts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      case "top":
        return posts.sort(
          (a, b) => (b.comments?.length ?? 0) - (a.comments?.length ?? 0)
        );
      default:
        return posts;
    }
  };
  const sortedPosts = sortPosts(posts);
  return (
    <div className="h-screen w-screen bg-gray-100 overflow-y-auto ">
      <Header />
      <div className="w-3/5 flex mt-4 mx-auto ">
        <div className="main-view-page w-2/3 mr-10">
          <div className="sticky z-10 top-[72px]">
            <div className="h-14 bg-white p-2 mb-4 flex">
              {isLoggedIn ? (
                <img src={dataUser?.avatar_url ? dataUser.avatar_url : "/social-media.png"} alt="icon" className="mx-2" />
              ) : (
                <img src="/social-media.png" alt="icon" className="mx-2" />
              )}
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
                <button
                  className={`flex items-center justify-center ${
                    sortCriteria === "best" ? "bg-[#eeeeee]" : ""
                  }`}
                  onClick={() => handleSortClick("best")}
                >
                  <img src="/star.png" alt="Star" className="mr-2"></img>
                  Best
                </button>
              </div>
              <div className="mr-2">
                <button
                  className={`flex items-center justify-center ${
                    sortCriteria === "hot" ? "bg-[#eeeeee]" : ""
                  }`}
                  onClick={() => handleSortClick("hot")}
                >
                  <img src="/fire.png" alt="Fire" className="mr-2"></img>
                  Hot
                </button>
              </div>
              <div className="mr-2">
                <button
                  className={`flex items-center justify-center ${
                    sortCriteria === "new" ? "bg-[#eeeeee]" : ""
                  }`}
                  onClick={() => handleSortClick("new")}
                >
                  <img src="/thunder.png" alt="Thunder" className="mr-2"></img>
                  New
                </button>
              </div>
              <div>
                <button
                  className={`flex items-center justify-center ${
                    sortCriteria === "top" ? "bg-[#eeeeee]" : ""
                  }`}
                  onClick={() => handleSortClick("top")}
                >
                  <img src="/up.png" alt="Up" className="mr-2"></img>Top
                </button>
              </div>
            </div>
          </div>
          {sortedPosts.map((post) => (
            <div key={post.id} className="post-view bg-white mt-4 z-0">
              <div className="h-[60vh] p-4 pb-4">
                <div className="header-post flex items-center h-[10%]">
                  <div className="user-icon mr-2">
                    <img
                      // src="/social-media.png"
                      src={post.user?.avatar_url ? post.user.avatar_url : "/social-media.png"}
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
                    {isLoggedIn && post.user_id === dataUser?.id && (
                      <>
                        <button
                          onClick={() =>
                            handleEditClick(post.id, post.post_tag)
                          }
                        >
                          <EditOutlined />
                        </button>
                        <button onClick={() => handleDelete(post.id)}>
                          <DeleteOutlined />
                        </button>
                        <Modal
                          title="Are you sure about that"
                          open={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          okButtonProps={{
                            style: {
                              background: "#DC2626",
                              borderColor: "#FFFFFF",
                            },
                          }}
                          cancelButtonProps={{
                            style: {
                              background: "#e2e2e2",
                              borderColor: "#e2e2e2",
                            },
                          }}
                        >
                          <div className="bg-gray-500 border mt-1 mb-4"></div>
                          <div className="flex items-center justify-center text-center">
                            <div className="flex flex-col items-center">
                              <img src="/warning.png" alt="Warning"></img>
                              <span className="font-bold mt-2">
                                Do you really want to delete this post? <br />
                                This process cannot be redone
                              </span>
                            </div>
                          </div>
                        </Modal>
                      </>
                    )}
                  </div>
                </div>
                <div className="content-post h-[60%] flex">
                  <div className="w-[5%] mr-6 font-bold flex flex-col items-center">
                    <button className="w-fit" onClick={() => handleVote(post.id)}>
                      <UpCircleOutlined />
                    </button>
                    +{post.post_vote?.length ?? 0}
                    <button className="w-fit" onClick={() => handleVote(post.id)}>
                      <DownCircleOutlined />
                    </button>
                  </div>
                  <div className="w-[85%]">
                    <div className="post-title font-bold mb-1">
                      {post.title}
                    </div>
                    <div className="description mb-1">{post.description}</div>
                    <div className="image mb-1 w-fit h-[100px]">
                      {post.image_url && <img src={post.image_url} alt="image" className="max-w-full max-h-full"/>}
                      {/* {post.image_url} */}
                    </div>
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
                    <div className="h-20 overflow-y-auto">
                      {post.comments?.map((comment) => (
                        <div key={comment.id} className="comment-item ml-4">
                          <div className="comment header flex">
                            <div className="mr-2">
                              <img
                                // src="/social-media.png"
                                src={comment.user?.avatar_url ? comment.user.avatar_url : "/social-media.png"}
                                alt="cmt icon"
                                width={32}
                                height={32}
                              ></img>
                            </div>
                            <div className="flex items-center justify-center font-bold">
                              {comment.user.name}
                            </div>
                            <div className="mr-2 ml-2 font-light text-xs flex items-center justify-center">
                              {formatDistanceToNow(
                                new Date(comment.created_at)
                              )}{" "}
                              ago
                            </div>
                          </div>
                          <div className="comment content mr-2 border-dotted border-l-2 border-gray-400 pl-4">
                            {comment.content}
                          </div>
                          <div className="vote font-bold flex flex-row items-center">
                            <button className="w-fit" onClick={() => handleCommentVote(comment.id)}><UpCircleOutlined/></button>
                            {post.comments.map((comment) => comment.comment_vote?.length ?? 0).reduce((acc, curr) => acc + curr, 0)}
                            <button className="w-fit" onClick={() => handleCommentVote(comment.id)}><DownCircleOutlined/></button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text comment flex mt-4 ml-4">
                      <img
                        // src="/social-media.png"
                        src={dataUser?.avatar_url ? dataUser.avatar_url : "/social-media.png"}
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
                        value={contentMap[post.id] || ""}
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
                      <img
                        // src="/social-media.png"
                        src={post.user?.avatar_url ? post.user.avatar_url : "/social-media.png"}
                        alt="user icon"
                        width={24}
                        height={24}
                      ></img>
                      <div className="ml-2">{post.user.name}</div>
                    </div>
                    <div className="mt-1">
                      <div className="font-bold">{post.title}</div>
                      <div className="truncate w-[250px]">
                        {post.description}
                      </div>
                      <div className="flex justify-end">
                        <div className="text-xs mr-1">
                          {post.comments?.length ?? 0} Comments -{" "}
                        </div>
                        <div className="text-xs">
                          Posted at{" "}
                          {formatDistanceToNow(new Date(post.created_at))} ago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
