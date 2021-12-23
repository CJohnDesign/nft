import logo from './img/MiamiTech-Yearbook-Cover.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="coverImg" alt="logo" />
        <div className="card">
          <p style={{marginTop: 0}}>Mint hasn't started</p>
          <div className="btn btnDisabled">
            Connect MetaMask
          </div>
        </div>

        {/* <p>
        We saw it happen.
        <br/>
        You can’t deny its existence.
        <br/>
        It’s here to stay.
        </p> */}
        
      </header>
    </div>
  );
}

export default App;
