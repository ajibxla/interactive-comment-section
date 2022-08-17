import React, { useContext, useState } from "react";
import { DataContext } from "../context/Context";
import { nanoid } from "nanoid";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

function Comment({
  image,
  alt,
  username,
  createdDate,
  commentContent,
  score,
  ownProfileImg,
  ownUsername,
  commentArrays,
}) {
  const [
    handleDecrease,
    handleIncrease,
    handleTextInput,
    currentUser,
    textInputChange,
  ] = useContext(DataContext);

  const [reply, setReply] = useState(false);
  const [replyBoolean, setReplyBoolean] = useState(false);
  const [replyContent, setReplyContent] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [commentArray, setcommentArray] = useState(commentArrays);

  console.log(commentArray);

  const handleClickReply = (event) => {};
  const handleEdit = (id) => {
    replyContent.filter((content) => {
      if (content.id === id) {
        setIsEditing(true);
      }
    });
  };

  const handleDeleteComment = (id) => {
    const newArray = commentArray.filter((content) => {
      return content.id !== id;
    });

    setcommentArray(newArray);
  };

  const handleCancel = (event) => {
    setIsEditing(null);
  };

  const addReply = (item) => {
    setReplyContent([item, ...replyContent]);
  };

  const handleUpdateEditedText = (id) => {
    setIsEditing(false);
    const newR = [...replyContent].map((content) => {
      if (id === content.id) {
        content.content = editedText;
      }
      return content;
    });

    const handleEditTextChange = (event) => {
      setEditedText(event.target.value);
    };

    const handleDeleteReply = (id) => {
      const newReplyContent = replyContent.filter((content) => {
        return content.id !== id;
      });
    };
    const handleSubmitReply = (event) => {
      event.preventDefault();

      let replyContent = {
        content: textInputChange,
        score: 0,
        id: nanoid(),
        edited: editedText,
      };

      let regex = /^\s*$/;

      if (textInputChange.match(regex)) {
        return;
      } else {
        addReply(replyContent);
        setReplyBoolean(true);
        setReply(false);
      }
    };

    return <div className="comment-card"></div>;
  };
}
export default Comment;
