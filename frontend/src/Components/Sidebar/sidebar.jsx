
import logo from '../../assets/logo.png'
import home from '../../assets/home.svg'
import AddBtn from '../../assets/add-30.png'
import Rocket from '../../assets/rocket.svg'
import Saved from '../../assets/bookmark.svg'
import msgIcon from '../../assets/message.svg'

function Sidebar(){
    return (
      <div className="side-bar">
        <div className="upperSide">
          <div className="upper-top">
            <img src={logo} alt="Tutor-app-logo" className="logo"></img>
            <h1 className='logo-text'>Tutorverse</h1>
          </div>
          <button className="session-btn"><img src={AddBtn}></img>New Session</button>
          <div className="upper-bottom">
            <button className="query-btn"><img src={msgIcon} alt='Query' ></img>What is CrewAI</button>
            <button className="query-btn"><img src={msgIcon} alt='Query'></img>Explain Photosynthesis</button>
          </div>
        </div>
        <div className="lowerSide">
            <div className="list-items"><img src={home} alt='home-image' className='listitemsImg'></img>Home</div>
            <div className="list-items"><img src={Saved} alt='Saved-image' className='listitemsImg'></img>Saved</div>
            <div className="list-items"><img src={Rocket} alt='Rocket-image' className='listitemsImg'></img>Upgrade to Pro</div>
        </div>
      </div>
    );
}
export default Sidebar;