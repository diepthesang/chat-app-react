// import React, {useEffect, useState} from 'react';
// import {Container, Row} from "react-bootstrap";
// import InfiniteScroll from "react-infinite-scroll-component";
// import {Chat} from "../../api/chat/chat";
//
// const RetrieveAccessToken = () => {
//
//     const style = {
//         height: 120,
//         border: "1px solid green",
//         margin: 6,
//         padding: 8
//     };
//
//     const [messages, setMessages] = useState([]);
//     const [pageNumber, setPageNumber] = useState(2);
//
//     useEffect(() => {
//         console.log('useEffect')
//         Chat.fetchMessagesByConversationBeSkipped(`f21a28a5-d75a-4207-ad51-ccf97ca35a5c`, 1)
//             .then(data => {
//                 console.log({messages_in_conversation: data.data})
//                 setMessages(data.data);
//             })
//             .catch(err => {
//                 console.error({err_getMessagesInConversationByConversationId: err})
//                 return err
//             })
//     }, []);
//
//     const getMoreMessages = () => {
//         console.log('fn_getMoreMessages')
//         setTimeout(() => {
//             Chat.fetchMessagesByConversationBeSkipped(`f21a28a5-d75a-4207-ad51-ccf97ca35a5c`, pageNumber)
//                 .then(data => {
//                     console.log({messages_in_conversation: data.data})
//                     setMessages([...messages, ...data.data] as never[]);
//                 })
//                 .catch(err => {
//                     console.error({err_getMessagesInConversationByConversationId: err})
//                 })
//             setPageNumber(pageNumber + 1)
//         }, 2000)
//     }
//
//
//     return (
//         <Container>
//             <Row>
//                 retrieve-access-token
//             </Row>
//             <Row>
//                 <div
//                     id="scrollableDiv"
//                     style={{
//                         height: 800,
//                         overflow: 'auto',
//                         display: 'flex',
//                         flexDirection: 'column-reverse',
//                     }}
//                 >
//                     <InfiniteScroll
//                         style={{display: 'flex', flexDirection: 'column-reverse'}}
//                         inverse={true}
//                         dataLength={messages.length}
//                         next={getMoreMessages}
//                         hasMore={true}
//                         loader={<h4>Loading...</h4>}
//                         // pullDownToRefresh
//                         // pullDownToRefreshThreshold={50}
//                         // pullDownToRefreshContent={
//                         //     <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
//                         // }
//                         // releaseToRefreshContent={
//                         //     <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
//                         // }
//                         scrollableTarget="scrollableDiv"
//                     >
//                         {messages.map((i, index) => (
//                             <div style={style} key={index}>
//                                 div - #{(i as any).text}
//                             </div>
//                         ))}
//                     </InfiniteScroll>
//                 </div>
//             </Row>
//         </Container>
//     );
// };
//
// export default RetrieveAccessToken;
//
