import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { FaBold, FaItalic, FaStrikethrough, FaCode, FaListOl, FaListUl, FaQuoteLeft, FaRedo, FaUndo, FaUnderline, FaMinus } from 'react-icons/fa';
import { TbRectangle } from 'react-icons/tb';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menu-bar">
      <div className="flex items-center flex-wrap">
        {/* button pertama ini untuk mengatasi bug, supaya ketika click editor-content focus tidak menjalankan fungsi button menu-bar yang pertama jadi button ini ditambahkan */}
        <button onClick={() => editor.chain().focus().run()} className="button-1"></button>
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
          <FaBold />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
          <FaItalic />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'is-active' : ''}>
          <FaUnderline />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>
          <FaStrikethrough />
        </button>
        <button onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'is-active' : ''}>
          <FaCode />
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
          <FaListUl />
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>
          <FaListOl />
        </button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
          <TbRectangle />
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''}>
          <FaQuoteLeft />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <FaMinus />
        </button>
      </div>
      <div>
        <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
          <FaUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

const TipTap = ({ setValue, autofocus, clear, content }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: `${content ? content : ''}`,
    autofocus: autofocus,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue(html);
    },
  });

  if (clear) {
    editor.commands.clearContent();
  }

  return (
    <div className="text-editor dark:border-white">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
