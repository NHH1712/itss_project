import {useState} from 'react';
const Upload = () => {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    console.log(file)
  };
  return (
    <div className="w-screen h-screen">
      <div>
        <input type="file" onChange={handleFileChange} />
        {/* <button onClick={uploadFile}>Upload</button> */}
        <img src="https://itss-HUSTBLOG.s3.us-east-1.amazonaws.com/cmt.png" alt="image" width={30} height={30}></img>
      </div>
    </div>
  );
};
export default Upload;
