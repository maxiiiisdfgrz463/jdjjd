import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  Edit,
  ImageIcon,
  MapPin,
  MessageSquare,
  Settings,
  UserIcon,
} from "lucide-react";
import Post from "./Post";

interface UserProfileProps {
  userId?: string;
  isOwnProfile?: boolean;
}

const UserProfile = ({
  userId = "1",
  isOwnProfile = false,
}: UserProfileProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Mock user data
  const user = {
    id: "1",
    name: "Jane Smith",
    username: "@janesmith",
    bio: "Digital designer and photographer based in New York. Passionate about creating beautiful interfaces and capturing moments.",
    location: "New York, USA",
    joinedDate: "January 2022",
    following: 245,
    followers: 1024,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    coverImageUrl:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
    interests: ["Design", "Photography", "Travel", "Technology"],
  };

  // Mock posts data
  const posts = [
    {
      id: "1",
      content:
        "Just finished my latest design project! So excited to share it with everyone.",
      imageUrl:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
      likes: 42,
      comments: 8,
      timestamp: "2 hours ago",
      author: user,
    },
    {
      id: "2",
      content: "Beautiful sunset from my balcony today. #nofilter",
      imageUrl:
        "https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?w=800&q=80",
      likes: 87,
      comments: 12,
      timestamp: "1 day ago",
      author: user,
    },
    {
      id: "3",
      content: "Working on some new UI concepts for a client project.",
      imageUrl:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80",
      likes: 35,
      comments: 5,
      timestamp: "3 days ago",
      author: user,
    },
  ];

  // Mock activity data
  const activities = [
    {
      id: "1",
      type: "post",
      description: "Posted a new photo",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "like",
      description: "Liked a post by Alex Johnson",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      type: "comment",
      description: "Commented on Maria's post",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      type: "follow",
      description: "Started following Design Weekly",
      timestamp: "2 days ago",
    },
  ];

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const handleEditProfile = () => {
    setEditDialogOpen(true);
  };

  const handleSaveProfile = () => {
    setEditDialogOpen(false);
    // Here you would save the profile changes to your backend
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-background">
      {/* Cover Image */}
      <div className="relative w-full h-64 overflow-hidden rounded-t-xl">
        <img
          src={user.coverImageUrl}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {isOwnProfile && (
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
            onClick={handleEditProfile}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6 -mt-16">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.username}</p>
              </div>

              {!isOwnProfile ? (
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              ) : (
                <Button variant="outline" onClick={handleEditProfile}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <p>{user.bio}</p>

          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>Joined {user.joinedDate}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <span className="font-bold">{user.following}</span>
              <span className="text-muted-foreground ml-1">Following</span>
            </div>
            <div>
              <span className="font-bold">{user.followers}</span>
              <span className="text-muted-foreground ml-1">Followers</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, index) => (
              <Badge key={index} variant="secondary">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Tabs for Posts and Activity */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6 space-y-6">
          {posts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              imageUrl={post.imageUrl}
              timestamp={post.timestamp}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Recent Activity</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {activities.map((activity) => (
                  <li key={activity.id} className="flex items-start gap-3">
                    <div className="bg-muted rounded-full p-2">
                      {activity.type === "post" && (
                        <ImageIcon className="h-4 w-4" />
                      )}
                      {activity.type === "like" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-heart"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      )}
                      {activity.type === "comment" && (
                        <MessageSquare className="h-4 w-4" />
                      )}
                      {activity.type === "follow" && (
                        <UserIcon className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p>{activity.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.timestamp}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                defaultValue={user.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                Username
              </label>
              <Input
                id="username"
                defaultValue={user.username}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bio" className="text-right">
                Bio
              </label>
              <Textarea
                id="bio"
                defaultValue={user.bio}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="location" className="text-right">
                Location
              </label>
              <Input
                id="location"
                defaultValue={user.location}
                className="col-span-3"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
