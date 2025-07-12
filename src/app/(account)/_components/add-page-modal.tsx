"use client";

import { useActionState, useState } from "react";
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
import { Plus } from "lucide-react";
import { createPage } from "@/actions/db/page";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputTags from "@/components/input-tags";

const WORDING_HEADER = {
  title: "Ajouter une page",
  description: "Ajoutez une page à votre collection.",
};

const AddPageForm = () => {
  const [state, action, pending] = useActionState(createPage, {
    error: false,
    message: "",
    data: {
      url: "",
      title: "",
      description: "",
      tags: [],
    },
  });
  console.log(state);
  return (
    <>
      <form action={action} className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="url"
            className="text-sm font-medium text-accent-foreground"
          >
            Website URL *
          </Label>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              id="url"
              name="url"
              type="text"
              defaultValue={state.data.url}
              placeholder="https://example.com"
              className="flex-1"
              required
            />
            {/* <Button
              type="button"
              variant="outline"
              size="sm"
              className="px-3 whitespace-nowrap bg-transparent w-full sm:w-auto"
            >
              ✨ AI Generate
            </Button> */}
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="title"
            className="text-sm font-medium text-accent-foreground"
          >
            Title
          </Label>
          <Input
            id="title"
            name="title"
            defaultValue={state.data.title}
            placeholder="Enter a title"
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
            defaultValue={state.data.description}
            placeholder="Add a description"
            className="resize-none"
            rows={3}
          />
        </div>
        <InputTags id="tags" label="Tags" name="tags" />

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

export function AddPageModal() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Add Page</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto bg-white border-stone-200e">
          <DialogHeader>
            <DialogTitle>{WORDING_HEADER.title}</DialogTitle>
            <DialogDescription>{WORDING_HEADER.description}</DialogDescription>
          </DialogHeader>
          <AddPageForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className=" shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Add Page</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader className="text-left">
          <DrawerTitle>{WORDING_HEADER.title}</DrawerTitle>
          <DrawerDescription>{WORDING_HEADER.description}</DrawerDescription>
        </DrawerHeader>
        <AddPageForm />
      </DrawerContent>
    </Drawer>
  );
}
