import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CommentType {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

interface PostProps {
  id?: string;
  author?: {
    name: string;
    username: string;
    avatar: string;
  };
  content?: string;
  images?: string[];
  timestamp?: string;
  likes?: number;
  comments?: CommentType[];
  shares?: number;
}

const Post = ({
  id = "1",
  author = {
    name: "Jane Smith",
    username: "janesmith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  content = "Just finished working on my latest project! So excited to share it with everyone soon. #coding #newproject",
  images = [
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
  ],
  timestamp = "2 hours ago",
  likes = 42,
  comments = [
    {
      id: "1",
      author: {
        name: "John Doe",
        username: "johndoe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      content: "Looks amazing! Can't wait to see it.",
      timestamp: "1 hour ago",
      likes: 5,
    },
    {
      id: "2",
      author: {
        name: "Sarah Johnson",
        username: "sarahj",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      content: "Great work as always!",
      timestamp: "45 minutes ago",
      likes: 3,
    },
  ],
  shares = 7,
}: PostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentsList, setCommentsList] = useState(comments);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: CommentType = {
        id: `comment-${Date.now()}`,
        author: {
          name: "Current User",
          username: "currentuser",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Current",
        },
        content: newComment,
        timestamp: "Just now",
        likes: 0,
      };
      setCommentsList([...commentsList, comment]);
      setNewComment("");
    }
  };

  return (
    <Card className="w-full mb-4 bg-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author.name}</p>
            <p className="text-sm text-muted-foreground">
              @{author.username} · {timestamp}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save post</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>Hide</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="mb-3">{content}</p>
        {images && images.length > 0 && (
          <div className="rounded-md overflow-hidden">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Post content"
                className="w-full h-auto object-cover rounded-md"
              />
            ))}
          </div>
        )}
        {content.includes("#") && (
          <div className="flex flex-wrap gap-2 mt-3">
            {content
              .split(" ")
              .filter((word) => word.startsWith("#"))
              .map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col pt-0">
        <div className="flex items-center justify-between w-full py-2">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
              onClick={handleLike}
            >
              <Heart
                className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
              />
              <span>{likeCount}</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-5 w-5" />
            <span>{commentsList.length}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <Share2 className="h-5 w-5" />
            <span>{shares}</span>
          </Button>
        </div>

        {showComments && (
          <div className="w-full pt-2">
            <Separator className="my-2" />
            <div className="space-y-4">
              {commentsList.map((comment) => (
                <div key={comment.id} className="flex space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={comment.author.avatar}
                      alt={comment.author.name}
                    />
                    <AvatarFallback>
                      {comment.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted p-2 rounded-md">
                      <div className="flex justify-between">
                        <p className="font-medium text-sm">
                          {comment.author.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {comment.timestamp}
                        </p>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs"
                      >
                        Like
                      </Button>
                      <span className="mx-1">·</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-start space-x-2 mt-4">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Current"
                  alt="Current User"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Write a comment..."
                  className="min-h-[60px]"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button size="sm" onClick={handleAddComment}>
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Post;
