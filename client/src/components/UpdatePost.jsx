import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Select } from 'antd';
const UpdatePost = () => {
  const navigateTo = useNavigate();
  const authInfo = useAuth();
  const { user } = authInfo;
  const [dataUser, setDataUser] = useState();
  const [dataPost, setDataPost] = useState();
  const [dataPostTag, setDataPostTag] = useState([]);
  const [tags, setTags] = useState([]);
  const { postId } = useParams();
  console.log(dataPost)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/user/${user.name}`)
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
  },[]);
  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/tags/')
        if (response.ok) {
          const data = await response.json();
          setTags(data);
        } else {
          console.error("Failed to fetch user");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchTag();
  },[]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/posts/${postId}`)
        if (response.ok) {
          const data = await response.json();
          setDataPost(data);
          const tagData = data.post_tag.map((postTag) => ({
            id: postTag.tag.id,
            name: postTag.tag.name,
          }));
          setDataPostTag(tagData);
        } else {
          console.error("Failed to fetch post");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPost();
  },[]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/posts/change/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post: {
            user_id: dataUser.id,
            title: dataPost.title,
            description: dataPost.description,
            image_url: dataPost.image_url
          },
          post_tags: dataPostTag.map(tag_id => ({ post_id: 0, tag_id: tag_id.id }))
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if(data){
          alert('update success');
          navigateTo('/');
        }
      } else {
        console.error('Update failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const removeDuplicates = (array) => {
    const uniqueArray = array.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );
    return uniqueArray;
  };
  return (
    <form onSubmit={handleSubmit}>
    <div className="h-screen w-screen bg-[#e7e5e4]">
      <div className="bg-white h-14 flex items-center justify-between">
        <div className="font-bold text-[20px] leading-5 pl-6">HEDSOCIAL</div>
        <div className="flex mr-10">
          <img src="/social-media.png" alt="user" width={20} height={20}></img>
          <span>{dataUser?.name}</span>
        </div>
      </div>
      <div className="create post w-3/5 h-4/5 mx-auto mt-10">
        <div className="text-3xl">
          Update Post
        </div>
        <div className="h-1 bg-white my-4"></div>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '50%', marginBottom: '20px'}}
            placeholder="Select tags"
            // defaultValue={dataPostTag}
            onChange={(value, options) => {
              setDataPostTag(prevData => removeDuplicates([...prevData, ...options.map(option => ({ id: option.id, value: option.value }))]));
            }}
            options={tags.map((tag) => ({ value: tag.name, id: tag.id }))}
          />
        <div className="bg-white h-4/5 p-4">
          <div className="mb-2">
            <span>Title</span><span className="text-red-600 ml-1">*</span>
            <input 
              value={dataPost?.title}
              onChange={(e) => setDataPost(prevData => ({ ...prevData, title: e.target.value }))}
              type="text" className="w-full border border-gray-300  flex items-center p-2 rounded-lg"></input>
          </div>
          <div className="h-1/2 mb-2">
            <span>Description</span><span className="text-red-600 ml-1">*</span>
            <textarea 
              value={dataPost?.description}
              onChange={(e) => setDataPost(prevData => ({ ...prevData, description: e.target.value }))}
              type="text" className="w-full border border-gray-300  flex items-center p-2 h-full rounded-lg"></textarea>
          </div>
          <div className="border border-[#DAE0E6] mt-10 mb-4 w-1/6 rounded-2xl">
            <button className="w-full"> + Image</button>
          </div>
          <div className="h-1 bg-[#d9d9d9] mb-4"></div>
          <div className="flex items-center text-center justify-end">
            <button
              to="/"
              className="bg-[#0e64d2] text-white rounded-lg px-4 py-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
};
export default UpdatePost;
