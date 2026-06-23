"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Link as LinkIcon,
  Minus,
  RotateCcw,
  RotateCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BlogEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function BlogEditor({
  value,
  onChange,
  placeholder = "เริ่มเขียนบทความ...",
}: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none",
      },
    },
  })

  if (!editor) return null

  function addLink() {
    const url = window.prompt("URL:")
    if (!url) return
    editor?.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      {/* Toolbar */}
      <div className="bg-muted/30 flex flex-wrap gap-1 border-b p-2">
        <ToolBtn
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <Bold className="size-4" />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <Italic className="size-4" />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline"
        >
          <UnderlineIcon className="size-4" />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <Strikethrough className="size-4" />
        </ToolBtn>

        <div className="bg-border mx-1 w-px" />

        <ToolBtn
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="หัวข้อ 2"
        >
          <Heading2 className="size-4" />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="หัวข้อ 3"
        >
          <Heading3 className="size-4" />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Quote"
        >
          <Quote className="size-4" />
        </ToolBtn>

        <div className="bg-border mx-1 w-px" />

        <ToolBtn
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="รายการ"
        >
          <List className="size-4" />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="รายการตัวเลข"
        >
          <ListOrdered className="size-4" />
        </ToolBtn>

        <div className="bg-border mx-1 w-px" />

        <ToolBtn
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          title="ชิดซ้าย"
        >
          <AlignLeft className="size-4" />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          title="กึ่งกลาง"
        >
          <AlignCenter className="size-4" />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          title="ชิดขวา"
        >
          <AlignRight className="size-4" />
        </ToolBtn>

        <div className="bg-border mx-1 w-px" />

        <ToolBtn onClick={addLink} active={editor.isActive("link")} title="ใส่ลิงก์">
          <LinkIcon className="size-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="เส้นแบ่ง">
          <Minus className="size-4" />
        </ToolBtn>

        <div className="ml-auto flex gap-1">
          <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">
            <RotateCcw className="size-4" />
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">
            <RotateCw className="size-4" />
          </ToolBtn>
        </div>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  )
}

function ToolBtn({
  children,
  onClick,
  active,
  title,
}: {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  title?: string
}) {
  return (
    <Button
      type="button"
      size="icon"
      variant={active ? "default" : "ghost"}
      onClick={onClick}
      title={title}
      className={cn("size-8", active && "bg-primary hover:bg-primary/90 text-white")}
    >
      {children}
    </Button>
  )
}
