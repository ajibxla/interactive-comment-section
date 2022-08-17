import React, { useContext, useState, useEffect } from "react";
import data from "../data.json";
import { DataContext } from "../context/Context";
import { nanoid } from "nanoid";
import Comment from "./Comment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import WindowResize from "./WindowResize";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

function InputComment() {
  const [
    handleDecrease,
    handleIncrease,
    handleTextInput,
    currentUser,
    textInputChange,
  ] = useContext(DataContext);

  const [comments, setComments] = useState(data.comments);
  const [inputState, setInputState] = useState("");
  const [submitBoolean, setSubmitBoolean] = useState(false);
  const [commentArray, setcommentArray] = useState(data.currentUser.comments);

  //
  const [reply, setReply] = useState(false);
  const [replyBoolean, setReplyBoolean] = useState(false);
  const [replyContent, setReplyContent] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedText, setEditedText] = useState("");
  // const [commentArray, setcommentArray] = useState(commentArrays);
  //

  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const createDate = timeAgo.format(Date.now() - 60 * 1000);

  const handleDeleteComment = (id) => {
    const newArray = commentArray.filter((content) => {
      return content.id !== id;
    });

    setcommentArray(newArray);
  };

  const windowResize = WindowResize();
  const windowSize = windowResize.props.children;

  // rteply end

  const handleCommentChange = (e) => {
    setInputState(e.target.value);
  };

  const addComment = (item) => {
    setcommentArray([...commentArray, item]);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    const newComment = {
      id: nanoid(),
      content: inputState,
      createdAt: "1 month ago",
      score: 0,
      reply: "false",
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    };

    let regex = /^\s*$/;

    if (inputState.match(regex)) {
      return;
    } else {
      addComment(newComment);
      setSubmitBoolean(true);
      setInputState("");
    }
  };

  // Comment start

  const handleClickReply = (event) => {
    setReply(!reply);
  };
  const handleEdit = (id) => {
    replyContent.filter((content) => {
      if (content.id === id) {
        setIsEditing(true);
      }
    });
  };

  // const handleDeleteComment = (id) => {
  //   const newArray = commentArray.filter((content) => {
  //     return content.id !== id;
  //   });

  //   setcommentArray(newArray);
  // };

  const handleCancel = (event) => {
    setIsEditing(null);
  };

  const addReply = (item) => {
    setReplyContent([item, ...replyContent]);
  };

  console.log(replyContent);

  const handleUpdateEditedText = (id) => {
    setIsEditing(false);
    const newR = [...replyContent].map((content) => {
      if (id === content.id) {
        content.content = editedText;
      }
      return content;
    });
  };
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
  // comment end

  return (
    <>
      <>
        <div className="comment-card-c">
          {commentArray.map((comment) => {
            return (
              <div className="comment-card-holder">
                {windowSize >= 750 ? (
                  <>
                    <div className="avatar--profile">
                      <div className="avatar--username">
                        <img
                          src={comment.user.image.webp}
                          alt={comment.user.username}
                        />
                        <p className="username">{comment.user.username}</p>
                      </div>

                      <p className="created-date">{createDate}</p>
                    </div>
                    <div className="comment-content">
                      <p>{comment.content}</p>
                    </div>

                    <div className="counter--reply-btn">
                      <div className="counter">
                        <span onClick={handleDecrease}>
                          <svg
                            width="11"
                            height="3"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                              fill="#C5C6EF"
                              className="hover"
                            />
                          </svg>
                        </span>
                        <p>{comment.score}</p>
                        <span onClick={handleIncrease}>
                          <svg
                            width="11"
                            height="11"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                              fill="#C5C6EF"
                              className="hover"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="counter--reply-btn">
                      <div className="reply--btn">
                        <div
                          className="delete"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <span>
                            <AiFillDelete />
                          </span>
                          <p>delete</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="avatar--profile">
                      <div className="avatar--username">
                        <img
                          src={comment.user.image.webp}
                          alt={comment.user.username}
                        />
                        <p className="username">{comment.user.username}</p>
                      </div>

                      <p className="created-date">{comment.createdAt}</p>
                    </div>
                    <div className="comment-content">
                      <p>{comment.content}</p>
                    </div>

                    <div className="counter--reply-btn">
                      <div className="counter">
                        <span onClick={handleDecrease}>
                          <svg
                            width="11"
                            height="3"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                              fill="#C5C6EF"
                            />
                          </svg>
                        </span>
                        <p>{comment.score}</p>
                        <span onClick={handleIncrease}>
                          <svg
                            width="11"
                            height="11"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                              fill="#C5C6EF"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="reply--btn">
                        <div
                          className="delete"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <span>
                            <AiFillDelete />
                          </span>
                          <p>delete</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {reply && (
                  <article className="response-section">
                    <form id="response-section-form" action="">
                      <textarea
                        name=""
                        id="textarea"
                        placeholder="Add a response"
                        onChange={handleTextInput}
                      ></textarea>
                      <div className="btn--img">
                        <button
                          className="send-btn"
                          onClick={handleSubmitReply}
                          type="submit"
                        >
                          Reply
                        </button>
                        <img src={currentUser.image.webp} alt="" />
                      </div>
                    </form>
                  </article>
                )}
              </div>
            );
          })}
        </div>

        {replyBoolean &&
          replyContent.map((content) => {
            return (
              <article className="content">
                <div className="name--created-date">
                  <div className="avatar--username">
                    <img src={currentUser.image.webp} alt="" />
                    <p className="content-username">{currentUser.username}</p>
                  </div>
                  <p className="content-created-date">Two days ago</p>
                </div>

                {isEditing ? (
                  <textarea
                    name=""
                    id="textarea"
                    placeholder="input text"
                    onChange={handleEditTextChange}
                  ></textarea>
                ) : (
                  <p className="content-paragraph">{content.content}</p>
                )}
                <div className="counter--btns">
                  {isEditing ? (
                    <button
                      className="update-btn"
                      onClick={() => handleUpdateEditedText(content.id)}
                    >
                      Update
                    </button>
                  ) : (
                    <div className="counter">
                      <span onClick={handleDecrease}>
                        <svg
                          width="11"
                          height="3"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                            fill="#C5C6EF"
                          />
                        </svg>
                      </span>
                      <p>{content.score}</p>
                      <span onClick={handleIncrease}>
                        <svg
                          width="11"
                          height="11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                            fill="#C5C6EF"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                  <div className="delete--edit">
                    <div
                      className="delete"
                      onClick={() => handleDeleteReply(content.id)}
                    >
                      <span>
                        <AiFillDelete />
                      </span>
                      <p>delete</p>
                    </div>
                    {isEditing ? (
                      <div className="edit" onClick={handleCancel}>
                        <span>
                          <MdCancel />
                        </span>
                        <p>Cancel</p>
                      </div>
                    ) : (
                      <div
                        className="edit"
                        onClick={() => handleEdit(content.id)}
                      >
                        <span>
                          <AiFillEdit />
                        </span>
                        <p>edit</p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
      </>

      <div className="input-comment">
        <form action="" id="form">
          <textarea
            name="textarea"
            id="textarea"
            placeholder="Add a comment..."
            onChange={handleCommentChange}
            value={inputState}
          ></textarea>

          <div className="avatar--btn">
            <div className="avatar">
              <img
                src={data.currentUser.image.webp}
                alt="current-user-avatar"
              />
            </div>

            <button className="send-btn" onClick={handleSubmitComment}>
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default InputComment;
