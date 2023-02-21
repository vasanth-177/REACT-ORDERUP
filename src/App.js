
import Signin from './Signin'
import Signup from './Signup'
import Adminlogin from './Adminlogin'
import Useroperations from './Useroperations'
import Adminoperations from './Adminoperations'
import Orderitems from './Orderitems'
import Acknowledge from './Acknowledge'
import Addhotel from './Addhotel'
import Additem from './Additem'
import Deletehotel from './Deletehotel'
import Deleteitem from './Deleteitem'
import Showorders from './Showorders'
import Orderdetails from './Orderdetails'



import { BrowserRouter as Router, Route,Switch} from 'react-router-dom'

const uname="";
var temp=[]
var id=0

function App() {


  return (
    <div>
      <script src="http://localhost:8097"></script>
      <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Signin />
            </Route>
            <Route path="/Signup">
              <Signup/>
            </Route>
            <Route path="/Adminlogin">
              <Adminlogin/>
            </Route>
            <Route path="/Adminoperations">
              <Adminoperations/>
            </Route>
            <Route path="/Useroperations">
              <Useroperations/>
            </Route>
            <Route exact path="/Orderitems">
              <Orderitems />
            </Route>
            <Route exact path="/Acknowledge">
              <Acknowledge/>
            </Route>
            <Route exact path="/Addhotel">
              <Addhotel/>
            </Route>
            <Route exact path="/Additem">
              <Additem/>
            </Route>
            <Route exact path="/Deleteitem">
              <Deleteitem/>
            </Route>
            <Route exact path="/Deletehotel">
              <Deletehotel/>
            </Route>
            <Route exact path="/Showorders">
              <Showorders/>
            </Route>
            <Route exact path="/Orderdetails/:id">
              <Orderdetails/>
            </Route>
            
          </Switch>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
