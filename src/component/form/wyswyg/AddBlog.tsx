import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS styles

const AddBlog = ({getValueContent}: any) => {
    const [text, setText] = useState('');

    const handleChange = (value: any) => { 
      setText(value)
    };

    
  
    return (
        <div className='h-[370px] overflow-auto'>
        <ReactQuill
          value={text}
          onChange={handleChange}
          modules={{
            toolbar: {
              container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean'],
              ],
            },
          }}
        />
      </div>
    );
  }

export default AddBlog