import { useState, useEffect } from "react";
import appwriteService from "../appwrite/config.js";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Container } from "postcss";
import { PostCard, PostForm } from "../components";

function EditPost() {
  const [post, SetPost] = useState(null);
  const navigate = useNavigate();
  const slug = useParams();

  useEffect(() => {
    appwriteService.getPost(slug).then((post) => {
      if (post) {
        SetPost(post);
      } else {
        navigate("/");
      }
    });
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
