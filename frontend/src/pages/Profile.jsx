import React, {useState, useContext, useEffect, useReducer} from 'react'
import ProfileHeader from '../components/ProfileHeader'
import ProfileOverview from '../components/ProfileOverview'
import ProfileSettings from '../components/ProfileSettings'

import axios from 'axios';
import {userContext} from '../contexts';

export default function Profile(props) {

    const user = useContext(userContext);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    useEffect(async () => {
        if (user.userId) {
            let userData = await axios.get('https://cz2006-nutrion.herokuapp.com' + '/user/' + user.userId);
            
            console.log(userData.data[0]);
            props.setUser(userData.data[0]);
            forceUpdate();
        }
    }, []);

    const [selected, setSelected] = useState("overview");
    const toggleToOverview = (e) => {
        setSelected("overview");        
    }
    const toggleToSettings = (e) => {
        setSelected("settings");
    }

    return (
        <div>
            <div style={{height: "1300px", marginTop: "50px"}} className="main-profile-container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-3">
                            <ProfileHeader user={user} toggleOverview = {toggleToOverview} toggleSettings = {toggleToSettings} />                            
                    </div>
                    <div className="col-md-7">
                            {selected === "overview" ? <ProfileOverview user={user}/>:
                                                        <ProfileSettings user={user}/>}           
                </div>
                <div className="col-md-1"></div>
                    </div>
            </div>
        </div>
    )
}
