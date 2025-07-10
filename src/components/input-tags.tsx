"use client";

import { InputHTMLAttributes, useState } from "react";
import { Tag, TagInput } from "emblor";

import { Label } from "@/components/ui/label";

interface InputTagsProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function InputTags({ id, label, name }: InputTagsProps) {
  const [exampleTags, setExampleTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <TagInput
        name={`${name}_display`}
        id={id}
        tags={exampleTags}
        setTags={setExampleTags}
        placeholder="Add a tag"
        styleClasses={{
          tagList: {
            container: "gap-1 mt-2",
          },
          input:
            "rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
          tag: {
            body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        inlineTags={false}
        inputFieldPosition="top"
      />
      <input
        type="hidden"
        name={name}
        value={JSON.stringify(exampleTags.map((tag) => tag.text))}
      />
    </div>
  );
}
