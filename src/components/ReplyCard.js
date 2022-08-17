import React, { useState, useContext, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { DataContext } from "../context/Context";
import Reply from "./Reply";
import WindowResize from "./WindowResize";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import data from "../data.json";
import Modal from "./Modal";

function ReplyCard({
  image,
  alt,
  username,
  createdDate,
  commentContent,
  score,
  ownProfileImg,
  ownUsername,
  id,
  handleOpenModal,
  childToParent,
  replyContentData,
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

  const [isEditing, setIsEditing] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [marginL, setMarginL] = useState(false);
  const [scores, setScores] = useState(data.score);

  const [replyContent, setReplyContent] = useState([]);

  const handleClickReply = (id) => {
    setReply(!reply);
  };

  console.log(ownProfileImg);

  const handleDeleteReply = (id) => {
    const newReplyContent = replyContent.filter((content) => {
      return content.id !== id;
    });

    setReplyContent(newReplyContent);
  };

  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo();

  const createDate = timeAgo.format(Date.now() - 60 * 1000);

  const windowResize = WindowResize();
  const windowSize = windowResize.props.children;

  const handleEdit = (id) => {
    replyContent.filter((content) => {
      if (content.id === id) {
        setIsEditing(true);
        setMarginL(true);
      }
    });
  };

  const handleEditTextChange = (event) => {
    setEditedText(event.target.value);
  };
  const handleCancel = (event) => {
    setIsEditing(null);
    setMarginL(false);
  };

  const handleUpdateEditedText = (id) => {
    setIsEditing(false);
    setMarginL(false);
    const newR = [...replyContent].map((content) => {
      if (id === content.id) {
        content.content = editedText;
      }
      return content;
    });

    setReplyContent(newR);
  };

  const addReply = (item) => {
    setReplyContent([item, ...replyContent]);
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

  return (
    <>
      <div className="comments--replies">
        <div className="comment-card">
          <div className="comment-card-holder">
            <div className="avatar--content">
              <div className="avatar--profile">
                <div className="avatar--username">
                  <img src={image} alt={alt} />
                  <p className="username">{username}</p>
                </div>

                <p className="created-date">{createdDate}</p>
              </div>
              <div className="comment-content">
                <p>{commentContent}</p>
                <p>{windowResize}</p>
              </div>
            </div>
            <div className="counter--reply-btn">
              <div className="counter">
                <span onClick={handleDecrease}>
                  <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                      fill="#C5C6EF"
                      className="svghover"
                    />
                  </svg>
                </span>
                <p>{score}</p>
                <span onClick={() => handleIncrease(score)}>
                  <svg
                    width="11"
                    height="11"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                      fill="#C5C6EF"
                      className="svghover"
                    />
                  </svg>
                </span>
              </div>
              <div className="reply--btn">
                <div className="reply" onClick={() => handleClickReply(id)}>
                  <svg
                    width="14"
                    height="13"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                      fill="#5357B6"
                    />
                  </svg>
                  <p>Reply</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {reply && (
          <article className="response-section">
            {windowSize >= 750 ? (
              <form id="response-section-form" action="">
                <img src={ownProfileImg} alt="" />
                <textarea
                  name=""
                  id="textarea"
                  placeholder={`@${username}`}
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
                </div>
              </form>
            ) : (
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
                  <img src={ownProfileImg} alt="" />
                </div>
              </form>
            )}
          </article>
        )}
        <div className="content-holder">
          {replyBoolean &&
            replyContent.map((content) => {
              return (
                <article className="content">
                  <div className="name--created-date">
                    <div
                      className={` ${
                        marginL ? "margin-l" : "avatar--username"
                      } `}
                    >
                      <img src={ownProfileImg} alt="" />
                      <p className="content-username">{ownUsername}</p>
                      <p className="you">you</p>
                    </div>

                    <p className="content-created-date">{createDate}</p>

                    {windowSize >= 750 && (
                      <div>
                        <div className="counter--btns">
                          {windowSize > 750 && (
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
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <div>
                      {/* <div className="avatar--username">
                      <img src={ownProfileImg} alt="" />
                      <p className="content-username">{ownUsername}</p>
                      <p className="you">you</p>
                    </div> */}
                      <textarea
                        name=""
                        id="textarea"
                        placeholder={textInputChange}
                        onChange={handleEditTextChange}
                      ></textarea>
                    </div>
                  ) : (
                    <p className="content-paragraph">
                      <span>{`@${username} `}</span>
                      {`${content.content}`}
                    </p>
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
                    {windowSize <= 750 && (
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
                    )}
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ReplyCard;
