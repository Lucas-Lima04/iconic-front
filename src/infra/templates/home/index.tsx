import { PostService } from "@/infra/api/post";
import { useAuth } from "@/infra/contexts/auth-contexts";
import { IPost } from "@/infra/models/IPost";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomeTemplate = () => {
  const { logout, user, getCurrentUser } = useAuth();
  const { push } = useRouter();
  const [posts, setPosts] = useState<IPost[]>([])
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPagesPage] = useState(0);

  const fetchPosts = async () => {
    const ret = await PostService.listPosts(currentPage);
    setPosts([...posts, ...ret.result]);
    setTotalPagesPage(ret.totalPages);
  }

  useEffect(() => {
    getCurrentUser();
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="w-full border-b border-[#ffffff80] flex justify-center">
        <div className="max-w-4xl w-4/5 flex justify-between py-4">
          <span className="cursor-pointer">Hello, {user?.name}!</span>
          <span className="cursor-pointer" onClick={logout}>Logout</span>
        </div>
      </div>

      <div className="w-full h-full overflow-y-auto mt-8">
        {posts.map((post, i) => 
          <div key={i} className="max-w-2xl w-4/5 mx-auto mb-5">
            <div className="bg-white p-8 rounded-xl">
                <h2 className="text-gray-800 font-semibold">{post.user.name}</h2>
              <div className="w-auto max-w-[500px] h-auto border mx-auto my-3">
                <img src={post.path} alt='' />
              </div>
              <h3 className="text-gray-400">{(new Date(post.createdAt + '')).toLocaleDateString()}</h3>
            </div>
          </div>
        )}

      {currentPage < totalPages -1 &&
        <div className="flex justify-center mt-5">
              <button disabled={false} onClick={() => {
                  if (currentPage < totalPages - 1) {
                    setCurrentPage(currentPage + 1);
                    fetchPosts();
                  }
              }}>Carregar mais</button>
        </div>
        }
      </div>

      <span 
        onClick={() => push('draw')}
        className="inline-flex sticky left-10 bottom-10 p-3 rounded-full bg-white shadow cursor-pointer hover:shadow-lg hover:scale-110 ease-in-out transition-all">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 24C10.9391 24 9.92172 23.5786 9.17157 22.8284C8.42143 22.0783 8 21.0609 8 20V16H4C2.93913 16 1.92172 15.5786 1.17157 14.8284C0.421427 14.0783 0 13.0609 0 12C0 10.9391 0.421427 9.92172 1.17157 9.17157C1.92172 8.42143 2.93913 8 4 8H8V4C8 2.93913 8.42143 1.92172 9.17157 1.17157C9.92172 0.421427 10.9391 0 12 0C13.0609 0 14.0783 0.421427 14.8284 1.17157C15.5786 1.92172 16 2.93913 16 4V8H20C21.0609 8 22.0783 8.42143 22.8284 9.17157C23.5786 9.92172 24 10.9391 24 12C24 13.0609 23.5786 14.0783 22.8284 14.8284C22.0783 15.5786 21.0609 16 20 16H16V20C16 21.0609 15.5786 22.0783 14.8284 22.8284C14.0783 23.5786 13.0609 24 12 24ZM4 10C3.46957 10 2.96086 10.2107 2.58579 10.5858C2.21071 10.9609 2 11.4696 2 12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14H9C9.26522 14 9.51957 14.1054 9.70711 14.2929C9.89464 14.4804 10 14.7348 10 15V20C10 20.5304 10.2107 21.0391 10.5858 21.4142C10.9609 21.7893 11.4696 22 12 22C12.5304 22 13.0391 21.7893 13.4142 21.4142C13.7893 21.0391 14 20.5304 14 20V15C14 14.7348 14.1054 14.4804 14.2929 14.2929C14.4804 14.1054 14.7348 14 15 14H20C20.5304 14 21.0391 13.7893 21.4142 13.4142C21.7893 13.0391 22 12.5304 22 12C22 11.4696 21.7893 10.9609 21.4142 10.5858C21.0391 10.2107 20.5304 10 20 10H15C14.7348 10 14.4804 9.89464 14.2929 9.70711C14.1054 9.51957 14 9.26522 14 9V4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2C11.4696 2 10.9609 2.21071 10.5858 2.58579C10.2107 2.96086 10 3.46957 10 4V9C10 9.26522 9.89464 9.51957 9.70711 9.70711C9.51957 9.89464 9.26522 10 9 10H4Z"
            fill="#9a9a9a"
          />
        </svg>
      </span>
    </ div>
  );
};

export default HomeTemplate;
