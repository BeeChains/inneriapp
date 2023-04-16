import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { PaypalButton } from 'react-paypal-button-v2';
import HandshakeClient from 'handshake-client';

// Components 
import Home from './components/Home';
import CreateWebsite from './components/CreateWebsite';
import BuySellTransfer from './components/BuySellTransfer';
import EditDNSRecords from './components/EditDNSRecords';
import NFTs from './components/NFTs';

// React Component
function HandshakeComponent() {
  const [handshakeClient, setHandshakeClient] = useState(null);

  useEffect(() => {
    const client = new HandshakeClient();
    setHandshakeClient(client);
  }, []);

  return (
    <div>
      {handshakeClient && (
        <div>HandshakeClient is ready!</div>
      )}
    </div>
  );
}

// App 
function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create-website">Create Website</Link>
            </li>
            <li>
              <Link to="/buy-sell-transfer">Buy/Sell/Transfer</Link>
            </li>
            <li>
              <Link to="/edit-dns-records">Edit DNS Records</Link>
            </li>
            <li>
              <Link to="/nfts">NFTs</Link>
            </li>
          </ul>
        </nav>

        <Route exact path="/" component={Home} />
        <Route path="/create-website">
          <div>
            <h2>Create Website</h2>
            <input type="text" value={inputValue} onChange={handleInputChange} />
          </div>
        </Route>

        <StripeProvider apiKey="pk_test_...">
          <Elements>
            <PaypalButton
              amount={10.00}
              currency="USD"
              onSuccess={(details, data) => {
                alert('Transaction completed by ' + details.payer.name.given_name);
              }}
            />
          </Elements>
        </StripeProvider>

        <Route path="/buy-sell-transfer">
          <BuySellTransfer inputValue={inputValue} handleInputChange={handleInputChange} />
        </Route>

        <Route path="/edit-dns-records">
          <EditDNSRecords inputValue={inputValue} handleInputChange={handleInputChange} />
        </Route>

        <Route path="/nfts">
          <NFTs inputValue={inputValue} handleInputChange={handleInputChange} />
        </Route>

        <HandshakeComponent />
      </div>
    </Router>
  );
}

export default App;