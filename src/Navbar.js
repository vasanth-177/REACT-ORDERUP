import App from './App'

const Navbar = () => {
    return (
       
      <nav className="navbar">
        <h1>Order Up</h1>
        <div className="links">
          <p>{App.uname}</p>
          <a href="/" style={{ 
            color: 'white', 
            backgroundColor: '#2ecc71',
            borderRadius: '8px' 
          }}>Log Out</a>
        </div>
      </nav>
    );
  }
   
  export default Navbar;