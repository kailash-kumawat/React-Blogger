import { useState, useEffect } from "react";
import appwriteService from "../appwrite/config.js";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, SetPosts] = useState([]);
  useEffect(() => {});
  appwriteService.getPosts([]).then((posts) => {
    if (posts) {
      SetPosts(posts.documents);
    }
  });
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => {
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard post={post} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
