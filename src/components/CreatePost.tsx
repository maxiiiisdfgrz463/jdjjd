import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CreatePostProps {
  onPostSubmit?: (content: { text: string; image?: File | null }) => void;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

const CreatePost = ({
  onPostSubmit = () => {},
  user = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    initials: "JD",
  },
}: CreatePostProps) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (!isExpanded && e.target.value.length > 0) {
      setIsExpanded(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setIsExpanded(true);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleSubmit = () => {
    if (text.trim() || image) {
      onPostSubmit({ text, image });
      setText("");
      handleRemoveImage();
      setIsExpanded(false);
    }
  };

  return (
    <Card className="w-full bg-background border shadow-sm mb-6">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[60px] resize-none border-none focus-visible:ring-0 p-2 text-sm"
              value={text}
              onChange={handleTextChange}
              onClick={() => setIsExpanded(true)}
            />

            {imagePreview && (
              <div className="relative mt-3 rounded-md overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-[300px] w-auto rounded-md object-contain"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8"
                  onClick={handleRemoveImage}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            )}

            {isExpanded && (
              <>
                <Separator className="my-3" />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <label htmlFor="image-upload">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer p-2 rounded-md hover:bg-accent transition-colors">
                        <ImageIcon className="h-5 w-5" />
                        <span>Image</span>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <Button
                    onClick={handleSubmit}
                    disabled={!text.trim() && !image}
                    className="flex items-center gap-2"
                  >
                    <span>Post</span>
                    <SendIcon className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
