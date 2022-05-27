export { messagesPage, addMessage } from './agent';
export const indexPage = (req, res) => {
  res.send({
    message: 'Hello franklin!',
    name: 'franklin'
  });
};

