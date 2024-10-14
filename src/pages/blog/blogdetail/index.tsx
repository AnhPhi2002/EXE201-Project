import React, { useState, FormEvent } from "react";
import { Facebook, Twitter, Linkedin, Search, Eye } from "lucide-react";
import { format } from "date-fns";

// Define TypeScript types for posts
interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    image: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  image: string;
  views: number;
  comments: { id: number; author: string; content: string }[];
}

const dummyPosts: Post[] = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence",
    content:
      "Artificial Intelligence (AI) is rapidly evolving and shaping various aspects of our lives. From autonomous vehicles to personalized recommendations, AI is becoming increasingly prevalent in our daily interactions. This blog post explores the potential future developments in AI and their implications for society.",
    author: {
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    tags: ["AI", "Technology", "Future"],
    createdAt: "2023-06-01T10:00:00Z",
    updatedAt: "2023-06-02T14:30:00Z",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    views: 1500,
    comments: [
      { id: 1, author: "Alice", content: "Great insights! Looking forward to more AI advancements." },
      { id: 2, author: "Bob", content: "I wonder how AI will impact job markets in the future." },
    ],
  },
  {
    id: 2,
    title: "Sustainable Living: Small Changes, Big Impact",
    content:
      "In the face of climate change, adopting sustainable living practices has become crucial. This blog post discusses simple yet effective ways to reduce our carbon footprint and live more sustainably. From reducing plastic use to embracing renewable energy, every small step counts towards a greener future.",
    author: {
      name: "Jane Smith",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    tags: ["Sustainability", "Environment", "Lifestyle"],
    createdAt: "2023-05-28T09:15:00Z",
    updatedAt: "2023-05-29T11:45:00Z",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1313&q=80",
    views: 2200,
    comments: [
      { id: 1, author: "Charlie", content: "These are great tips! I'll definitely try to implement some in my daily life." },
      { id: 2, author: "Diana", content: "It's amazing how small changes can make such a big difference." },
    ],
  },
];

const BlogDetail: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<Post>(dummyPosts[0]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const foundPost = dummyPosts.find(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundPost) {
      setSelectedPost(foundPost);
    }
  };

  const relatedPosts = dummyPosts.filter((post) => post.id !== selectedPost.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <article className="">
        <img
          src={selectedPost.image}
          alt={selectedPost.title}
          className="w-full h-80 object-cover object-center"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src={selectedPost.author.image}
                alt={selectedPost.author.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{selectedPost.author.name}</p>
                <p className="text-sm text-gray-600">
                  {format(new Date(selectedPost.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>
            <p className="flex items-center">
              <Eye className="mr-1" /> {selectedPost.views} views
            </p>
          </div>
          <p className="text-gray-700 mb-6">{selectedPost.content}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedPost.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>   
        </div>
      </article>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
              onClick={() => setSelectedPost(post)}
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover object-center" />
              <div className="p-4">
                <h3 className="font-bold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{post.author.name}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(post.createdAt), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {/* Display comments if needed */}
      </section>
    </div>
  );
};

export default BlogDetail;
