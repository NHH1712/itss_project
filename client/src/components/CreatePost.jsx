import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Select, Modal, message, Upload, Button } from 'antd';
const CreatePost = () => {
  const navigateTo = useNavigate();
  const authInfo = useAuth();
  const { user } = authInfo;
  const [dataUser, setDataUser] = useState();
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const newImageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedImages((prevImages) => [...prevImages, ...newImageUrls]);
    }
  };
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
  // const tagNames = tags.map((tag) => tag.name);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/posts/user/${dataUser.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post: {
            user_id: dataUser.id,
            title: title,
            description: description,
            // image_url: fileList
          },
          post_tags: tag.map(tag_id => ({ post_id: 0, tag_id: tag_id.id }))
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if(data){
          alert('Create success');
          navigateTo('/');
        }
      } else {
        console.error('Creat failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <>
    <div className="h-screen w-screen bg-[#e7e5e4]">
      <div className="bg-white h-14 flex items-center justify-between">
        <div className="font-bold text-[20px] leading-5 pl-6">HEDSOCIAL</div>
        <div className="flex mr-10">
          <img src="/social-media.png" alt="user" width={20} height={20} className="mr-2"></img>
          <span>{dataUser?.name}</span>
        </div>
      </div>
      <div className="create post w-3/5 h-[90%] mx-auto mt-4">
        <div className="text-3xl">
          Create a new post
        </div>
        <div className="h-1 bg-white my-4"></div>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '50%', marginBottom: '20px'}}
            placeholder="Select tags"
            // onChange={(value) => setTag(value)}
            // options={tagNames.map((tag) => ({ value: tag }))}
            onChange={(value, options) => setTag(options.map(option => ({ id: option.id, value: option.value })))}
            options={tags.map((tag) => ({ value: tag.name, id: tag.id }))}
          />
        <div className="bg-white h-4/5 p-4">
          <div className="mb-2">
            <span>Title</span><span className="text-red-600 ml-1">*</span>
            <input 
              onChange = {(e) => setTitle(e.target.value)}
              type="text" className="w-full border border-gray-300 flex items-center p-2 rounded-lg" required></input>
          </div>
          <div className="h-1/2 mb-2">
            <span>Description</span><span className="text-red-600 ml-1">*</span>
            <textarea 
              onChange={(e) => setDescription(e.target.value)}
              type="text" className="w-full border border-gray-300 flex items-center p-2 h-full rounded-lg" required></textarea>
          </div>
          {/* <div className="border border-[#DAE0E6] mt-10 mb-4 w-1/6 rounded-2xl">
            <button className="w-full" type="file"> + Image</button>
          </div> */}
          <div className="border border-[#DAE0E6] mt-10 mb-4 rounded-lg h-[80px]">
            <div className="flex flex-col items-start">
              <input
                type="file"
                onChange={handleImageChange}
                multiple
                // className="mb-4"
              />
              <div className="flex w-full mt-2">
                {selectedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Uploaded"
                    className="w-[30px] h-[30px] mx-2"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="h-1 bg-[#d9d9d9] mb-4"></div>
          <div className="flex items-center text-center justify-end">
            <button
              to="/"
              className="bg-[#0e64d2] text-white rounded-lg px-4 py-2 "
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default CreatePost;
