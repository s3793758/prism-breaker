import App from './App';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './index.css';

const client = new ApolloClient({
  uri: 'http://localhost:3030/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
