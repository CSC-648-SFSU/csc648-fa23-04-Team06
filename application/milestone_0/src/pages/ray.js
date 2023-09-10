import Header from "../components/header"
import '../components/raySettings/ray.css';
import profileImage from "../components/raySettings/aboutProfile.png" 

export default function(){
    return(
        <>
        <Header/>
        <div className="title-container">
            <h1 className="my-title">Ray Dela Cruz</h1>
            <h1 className="my-subtitle">Front End Leader</h1>
        </div>
        <div className="flex-container">
            <div className="flex-item">
                <h2 className="item-title">About Me</h2>
                <div className="item-content-layout">
                    <div className="item-content-img">
                        <img
                          src={profileImage}
                          alt="Profile Image"
                          style={{ width: '281px', height: '400px' }}
                        />
                    </div>
                    <div className="item-content">
                        <p className="reg-text">
                          Hi I'm Ray and currently a Senior and scheduled 
                          to graduate sprint 2024. I am a transfer from Napa
                          Valley College. Going in to this field is a career
                          change from my work in mental health for the state.
                          It has proven to be a big change from what I have 
                          been used to but, it has been a welcome challenge.
                        </p>
                    </div> 
                </div>
            </div>
            <div className="flex-item">
                <h2 className="item-title">Hobbies</h2>
                <div className="item-content-layout">
                    <div className="item-content">                    
                        <ul className="hobby-text">
                            <li>ergpj</li>
                            <li>ergpj</li>
                            <li>ergpj</li>
                            <li>ergpj</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex-item">
                <h2 className="item-title">Section</h2>
            </div>

        </div>
            
        
                
        

        </>
    )
}