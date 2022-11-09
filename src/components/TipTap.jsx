import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
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

const TipTap = ({ setValue, autofocus, clear, content, isEditable, limit }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CharacterCount.configure({
        limit,
      }),
    ],
    content: `${content ? content : ''}`,
    autofocus: autofocus,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue(html);
    },
    editable: isEditable,
  });

  const percentage = editor ? Math.round((100 / limit) * editor.storage.characterCount.characters()) : 0;

  if (clear) {
    editor.commands.clearContent();
  }

  return (
    <div className="text-editor dark:border-white">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {editor && (
        <div className={`mt-4 mr-1 flex justify-end items-center text-[#68CEF8] ${editor.storage.characterCount.characters() === limit ? 'text-[#FB5151]' : ''}`}>
          <svg height="20" width="20" viewBox="0 0 20 20" className="mr-2">
            <circle r="10" cx="10" cy="10" fill="#e9ecef" />
            <circle r="5" cx="10" cy="10" fill="transparent" stroke="currentColor" strokeWidth="10" strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`} transform="rotate(-90) translate(-20)" />
            <circle r="6" cx="10" cy="10" fill="white" />
          </svg>

          <div className="text-[#868e96]">
            {editor.storage.characterCount.characters()}/{limit}
          </div>
        </div>
      )}
    </div>
  );
};

export default TipTap;
