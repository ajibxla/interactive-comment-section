import React, { useState, useContext } from "react";
import data from "../data.json";
import { DataContext } from "../context/Context";
import { nanoid } from "nanoid";
import ReplyCard from "./ReplyCard";
import Comment from "./Comment";
import Reply from "./Reply";
import WindowResize from "./WindowResize";
import Modal from "./Modal";
import Styledtest from "./Styledtest";

function CommentCard() {
  const [
    handleDecrease,
    handleIncrease,
    handleTextInput,
    currentUser,
    textInputChange,
  ] = useContext(DataContext);

  const windowResize = WindowResize();
  const windowSize = windowResize.props.children;

  const Test = () => {
    return <h1>Left hand side!</h1>;
  };
  const Tight = () => {
    return <h1>Right hand Side!</h1>;
  };

  const [modal, setModal] = useState(false);

  console.log(currentUser.image.webp);

  return (
    <>
      {modal && <Modal />}

      <Styledtest left={Test} right={Tight} />
      <article>
        {data.comments.map((comment) => {
          return (
            <>
              <ReplyCard
                key={comment.id}
                image={comment.user.image.webp}
                alt={comment.user.username}
                username={comment.user.username}
                createdDate={comment.createdAt}
                commentContent={comment.content}
                score={comment.score}
                ownProfileImg={currentUser.image.webp}
                ownUsername={currentUser.username}
                id={comment.id}
              />
            </>
          );
        })}

        {data.currentUser.comments.map((comment) => {
          return (
            <Comment
              image={comment.user.image.webp}
              alt={comment.username}
              username={comment.username}
              createdDate={comment.createdAt}
              commentContent={comment.content}
              score={comment.score}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              id={comment.id}
              ownProfileImg={currentUser.image.webp}
              ownUsername={currentUser.username}
            />
          );
        })}
      </article>
    </>
  );
}

export default CommentCard;
