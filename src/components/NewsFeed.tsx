import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import CreatePost from "./CreatePost";
import Post from "./Post";

interface PostData {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  timestamp: string;
  likes: number;
  comments: {
    id: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
  }[];
}

interface NewsFeedProps {
  posts?: PostData[];
  isLoading?: boolean;
  onLoadMore?: () => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({
  posts = mockPosts,
  isLoading = false,
  onLoadMore = () => console.log("Load more posts"),
}) => {
  const [feedPosts, setFeedPosts] = useState<PostData[]>(posts);
  const [loading, setLoading] = useState<boolean>(isLoading);

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // If scrolled to bottom (with a small threshold)
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setLoading(true);
        // Simulate loading more posts
        setTimeout(() => {
          onLoadMore();
          setLoading(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, onLoadMore]);

  // Handle new post creation
  const handleNewPost = (newPost: PostData) => {
    setFeedPosts([newPost, ...feedPosts]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 bg-background">
      <div className="mb-6">
        <CreatePost onPostCreated={handleNewPost} />
      </div>

      <div className="space-y-6">
        {feedPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

// Mock data for default props
const mockPosts: PostData[] = [
  {
    id: "1",
    author: {
      id: "user1",
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    content:
      "Just finished building my new portfolio website! Check it out and let me know what you think. #webdev #portfolio",
    timestamp: "2023-06-15T14:30:00Z",
    likes: 24,
    comments: [
      {
        id: "c1",
        author: {
          id: "user2",
          name: "Sam Taylor",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
        },
        content: "Looks amazing! Love the design.",
        timestamp: "2023-06-15T15:10:00Z",
      },
    ],
  },
  {
    id: "2",
    author: {
      id: "user3",
      name: "Jamie Rivera",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
    },
    content: "Beautiful sunset at the beach today!",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    ],
    timestamp: "2023-06-14T19:45:00Z",
    likes: 56,
    comments: [
      {
        id: "c2",
        author: {
          id: "user4",
          name: "Taylor Morgan",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
        },
        content: "Wow! Where is this?",
        timestamp: "2023-06-14T20:05:00Z",
      },
      {
        id: "c3",
        author: {
          id: "user3",
          name: "Jamie Rivera",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
        },
        content: "Malibu Beach, California!",
        timestamp: "2023-06-14T20:15:00Z",
      },
    ],
  },
  {
    id: "3",
    author: {
      id: "user5",
      name: "Jordan Casey",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    },
    content:
      "Just released a new version of my app with dark mode support! #tech #darkmode",
    timestamp: "2023-06-13T10:20:00Z",
    likes: 42,
    comments: [],
  },
];

export default NewsFeed;
