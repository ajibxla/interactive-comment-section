// import React, { useContext } from "react";
// import { DataContext } from "../context/Context";
// import WindowResize from "./WindowResize";

// function Reply({ ownProfileImg, handleSubmitReply }) {
//   const [
//     handleDecrease,
//     handleIncrease,
//     handleTextInput,
//     currentUser,
//     textInputChange,
//   ] = useContext(DataContext);

//   const windowResize = WindowResize();
//   const windowSize = windowResize.props.children;
//   return (
//     <>
//       <article className="response-section">
//         {windowSize > 750 ? (
//           <form id="response-section-form" action="">
//             <img src={ownProfileImg} alt="" />
//             <textarea
//               name=""
//               id="textarea"
//               placeholder="Add a response"
//               onChange={handleTextInput}
//               value={textInputChange}
//             ></textarea>
//             <div className="btn--img">
//               <button
//                 className="send-btn"
//                 onClick={handleSubmitReply}
//                 type="submit"
//               >
//                 Reply
//               </button>
//             </div>
//           </form>
//         ) : (
//           <form id="response-section-form" action="">
//             <textarea
//               name=""
//               id="textarea"
//               placeholder="Add a response"
//               onChange={handleTextInput}
//               value={textInputChange}
//             ></textarea>
//             <div className="btn--img">
//               <button
//                 className="send-btn"
//                 onClick={handleSubmitReply}
//                 type="submit"
//               >
//                 Reply
//               </button>
//               <img src={ownProfileImg} alt="" />
//             </div>
//           </form>
//         )}
//       </article>
//     </>
//   );
// }
// export default Reply;
