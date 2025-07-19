"use client";

import { useActionState, useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Loader2, Plus } from "lucide-react";
import { createPage, CreatePageState } from "@/actions/db/page";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputTags from "@/components/input-tags";
import { Tag } from "emblor";

const WORDING_HEADER = {
  title: "Ajouter un tweet",
  description: "Ajoutez un tweet à votre collection.",
};

const AddTweetForm = ({
  state,
  action,
  pending,
}: {
  state: CreatePageState;
  action: (payload: FormData) => void;
  pending: boolean;
}) => {
  const [tweetContent, setTweetContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  const generateTweet = async (content: string) => {
    const response = await fetch("/api/generate-content-tweet", {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    const data = await response.json();

    if (data.title) setTitle(data.title);
    if (data.description) setDescription(data.description);
    if (data.url) setUrl(data.url);
    if (data.tags && Array.isArray(data.tags)) {
      setTags(
        data.tags.map((tag: string) => ({ id: crypto.randomUUID(), text: tag }))
      );
    }
  };

  return (
    <>
      <form action={action} className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="tweetContent"
            className="text-sm font-medium text-accent-foreground"
          >
            Contenu du tweet *
          </Label>
          <div className="flex flex-col space-y-2">
            <Textarea
              id="tweetContent"
              name="tweetContent"
              value={tweetContent}
              onChange={(e) => setTweetContent(e.target.value)}
              placeholder="Collez le contenu du tweet ici..."
              className="resize-none min-h-[100px]"
              rows={4}
              required
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="px-3 whitespace-nowrap bg-transparent w-full sm:w-auto"
              onClick={() => generateTweet(tweetContent)}
            >
              ✨ AI Generate
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="url"
            className="text-sm font-medium text-accent-foreground"
          >
            URL du tweet (optionnel)
          </Label>
          <Input
            id="url"
            name="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://twitter.com/user/status/..."
            className=""
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="title"
            className="text-sm font-medium text-accent-foreground"
          >
            Titre
          </Label>
          <Input
            id="title"
            name="title"
            value={title || state.data.title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entrez un titre"
            className=""
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={description || state.data.description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ajoutez une description"
            className="resize-none"
            rows={3}
          />
        </div>
        <InputTags
          id="tags"
          label="Tags"
          name="tags"
          tags={tags}
          setTags={setTags}
        />

        {state.error && (
          <span className="text-red-500 text-sm">{state.message}</span>
        )}
        <Button type="submit" disabled={pending}>
          {pending ? "Ajout en cours..." : "Ajouter"}
        </Button>
      </form>
    </>
  );
};

export function AddTweetModal() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [state, action, pending] = useActionState(createPage, {
    error: false,
    message: "",
    open: false,
    data: {
      url: "",
      title: "",
      description: "",
      tags: [],
    },
  });

  useEffect(() => {
    if (state.message === "Page created") {
      setOpen(false);
    }
  }, [state]);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Add Tweet</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto bg-white border-stone-200e">
          {pending ? (
            <div className="flex items-center justify-center h-full gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Ajout en cours...
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>{WORDING_HEADER.title}</DialogTitle>
                <DialogDescription>
                  {WORDING_HEADER.description}
                </DialogDescription>
              </DialogHeader>
              <AddTweetForm state={state} action={action} pending={pending} />
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className=" shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Add Tweet</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        {pending ? (
          <div className="flex items-center justify-center h-full gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Ajout en cours...
          </div>
        ) : (
          <>
            <DrawerHeader className="text-left">
              <DrawerTitle>{WORDING_HEADER.title}</DrawerTitle>
              <DrawerDescription>
                {WORDING_HEADER.description}
              </DrawerDescription>
            </DrawerHeader>
            <AddTweetForm state={state} action={action} pending={pending} />
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
