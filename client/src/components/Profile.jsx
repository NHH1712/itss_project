import Header from "./Header";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const { user } = authInfo;
  const [dataUser, setDataUser] = useState();
  const [posts, setPosts] = useState([]);
  const handleEditClick = (postId) => {
    navigate(`/update-post/${postId}`);
  };
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
  }, [])
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
    if(!confirmDelete) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Post deleted successfully");
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="w-screen h-screen bg-[#e7e5e4]">
      <Header />
      <div className="w-4/5 mx-auto bg-white mt-6 flex h-4/5 overflow-y-auto">
        <div className="post-view w-[70%] border-r">
          <div className="h-14 border-b sticky top-0 z-10">
          <div className="px-1 py-1.5 mx-10 flex items-center text-center">
            <button className="w-fit bg-[#eeeeee] rounded-lg text-[#0079D3] font-bold text-[15px] mr-2">POST</button>
            <button className="w-fit font-bold text-[15px] text-black opacity-50">DELETED</button>
          </div>
          </div>
          <div className="h-full">
            {posts.filter((post) => post.user_id === dataUser?.id).map((post) => (
              <div key={post.id} className="post-view bg-white z-0">
              <div className="h-[40vh] p-4 ml-6">
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
                          title="Are you sure about that" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                          okButtonProps={{ style: { background: '#DC2626', borderColor: '#FFFFFF' } }}
                          cancelButtonProps={{ style: { background: '#e2e2e2', borderColor: '#e2e2e2' } }}
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
                    <div className="h-20 overflow-y-auto">
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
                    </div>
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
                        // value={contentMap[post.id] || ""}
                        // onChange={handleContentChange(post.id)}
                      ></input>
                      <button
                        style={{ height: "32px" }}
                        className="flex items-center"
                        // onClick={handleSubmit}
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
        </div>
        <div className="info w-[30%]">
          <div className="h-14 border-b font-bold items-center flex sticky top-0 z-10"><span className="w-[90%] mx-auto">Info</span></div>
          <div className="h-full">
            <div className="w-[90%] h-[30%] mt-4 mx-auto rounded p-1 border border-gray-200">
              <div className="mb-2">
                <img src="/social-media.png" width={48} height={48} alt="" />
              </div>
              <div className="ml-2">{dataUser?.name}</div>
              <div className="ml-2">Lớp: {dataUser?.classname} - {dataUser?.grade}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Profile;
