// export everything from home.js
// export * from './home';
export { messagesPage, addMessage } from './agent';
export const indexPage = (req, res) => {
  res.send({
    message: 'Hello franklin!',
    name: 'franklin'
  });
};

// app.post('/api/post', (req, res) => {
//   res.json({
//     message: 'Post created...'
//  });
// });