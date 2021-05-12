import React, {useState, useContext, useReducer} from 'react'
import Button from './Button'
import '../styles/ProfileSettings.css'
import profileimg from '../assets/images/bryson.jpg'
import CustomizedHook from '../assets/material-ui/CustomizedHook'
import { GiConsoleController, GiPropellerBeanie } from 'react-icons/gi'
import axios from 'axios';
import async from 'async';
import { userContext, generalContext } from '../contexts';

export default function ProfileSettings(props) {
    const user = useContext(userContext);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    // Profile Picture
    const [profilepic, setProfilePic] = useState({
        profilepic: "",
        toggle: false
    });
    const toggleProfilePic = (e) => {
        setProfilePic({...profilepic, ["toggle"]: !profilepic.toggle});
        forceUpdate();
    }
    const updateProfilePic = (e) => {
        toggleProfilePic()
        console.log(profilepic.profilepic)
        console.log("Updating profilepic to database!");
        
    }
    const handleProfilePicture = (e) => {
        var preview = document.querySelector('#profile-picture');
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();
      
        reader.onloadend = function () {
          preview.src = reader.result;
        }

        if(file) {
            reader.readAsDataURL(file);
        } 
        else {
            preview.src = "";
        }
        setProfilePic({...profilepic, ["profilepic"]: file})
    }

    // Username
    const [username, setUsername] = useState({
        username: props.user.username,
        toggle: false
    });
    const toggleUsername = (e) => {
        setUsername({...username, ["toggle"]:!username.toggle});
        forceUpdate();
    }
    const updateUsername =async (e) => {
        console.log(username.username);

        try{
            // Need to add userID
            const res = await axios.put('https://cz2006-nutrion.herokuapp.com/user/' + user.userId, {"username":username.username});
            console.log(res);
            toggleUsername()
        }
        catch(error) {
            if(error.response){
                console.log(error.response.data);
            }
        }
    }

    // First Name
    const [firstname, setFirstName] = useState({
        firstname: props.user.firstName,
        toggle: false
    });
    const toggleFirstName = (e) => {
        setFirstName({...firstname, ["toggle"]:!firstname.toggle});
        forceUpdate();
    }
    const updateFirstName =async (e) => {
        console.log(firstname.firstname);

        try{
            // Need to add userID
            console.log({"firstName":firstname.firstname})
            const res = await axios.put('https://cz2006-nutrion.herokuapp.com/user/'+ user.userId, {"firstName":firstname.firstname});
            console.log(res);
            toggleFirstName()
        }
        catch(error) {
            if(error.response){
                console.log(error.response.data);
            }
        }
    }

    // Last Name
    const [lastname, setLastName] = useState({
        lastname: props.user.lastName,
        toggle: false
    });
    const toggleLastName = (e) => {
        setLastName({...lastname, ["toggle"]: !lastname.toggle});
        forceUpdate();
    }
    const updateLastName =async (e) => {
        console.log(lastname.lastname)

        try{
            // Need to add userID
            const res = await axios.put('https://cz2006-nutrion.herokuapp.com/user/'+user.userId, {"lastName":lastname.lastname});
            console.log(res);
            toggleLastName()
            
        }
        catch(error) {
            if(error.response){
                console.log(error.response.data);
            }
        }
    }

    // Email
    const [email, setEmail] = useState({
        email: props.user.email,
        toggle: false
    });
    const toggleEmail = (e) => {
        setEmail({...email, ["toggle"]: !email.toggle});
        forceUpdate();
    }
    const updateEmail =async (e) => {
        console.log(email.email)

        try{
            // Need to add userID
            const res = await axios.put('https://cz2006-nutrion.herokuapp.com/user/'+user.userId, {"email":email.email});
            console.log(res);
            toggleEmail()
        }
        catch(error) {
            if(error.response){
                console.log(error.response.data);
            }
        }
    }

    // Password & Confirm Password
    const [password, setPassword] = useState({
        password: "",
        toggle: false    
    });
    const [confirmpassword, setConfirmPassword] = useState("");
    const togglePassword = (e) => {
        setPassword({...password, ["toggle"]: !password.toggle});
        forceUpdate();
    }
    const updatePassword =async (e) => {
        console.log(password.password);
        console.log(confirmpassword);

        if(password.password.length < 8){
            alert("Password must have at least 8 characters");
            return;
        }
        if(password.password != confirmpassword){
            alert("Password not match");
            return;
        }
        

        try{
            // Need to add userID
            
            const res = await axios.put('https://cz2006-nutrion.herokuapp.com/user/'+user.userId,
            {"password":password.password,
            "confirmPassword":confirmpassword});

            console.log(res);
            togglePassword()
        }
        catch(error) {
            if(error.response){
                console.log(error.response.data);
            }
        }
    }

    // Height
    const [height, setHeight] = useState({
        height: props.user.height,
        toggle: false
    });
    const toggleHeight = (e) => {
        setHeight({...height, ["toggle"]: !height.toggle});
        forceUpdate();
    }
    const updateHeight =async (e) => {
        console.log(height.height);

        try{
            // Need to add userID
            const res = await axios.put('https://cz2006-nutrion.herokuapp.com/user/'+user.userId, {"height":height.height});
            console.log(res);
            toggleHeight()
        }
        catch(error) {
            if(error.response){
                console.log(error.response.data);
            }
        }
    }

    // Weight
    const [weight, setWeight] = useState({
        weight: props.user.weight,
        toggle: false
    });
    const toggleWeight = (e) => {
        setWeight({...weight, ["toggle"]: !weight.toggle});
        forceUpdate();
    }
    const updateWeight =async (e) => {
        console.log(weight.weight);

        try{
            // Need to add userID
            const res = await axios.put('https://cz2006-nutrion.herokuapp.com/user/'+user.userId, {"weight":weight.weight});
            console.log(res);
            toggleWeight()
        }
        catch(error) {
            if(error.response){
                console.log(error.response.data);
            }
        }
    }

    // Health Conditions
    const [condition, setCondition] = useState({
        conditions: props.user.healthCondition,
        toggle: false
    });
    const toggleCondition = (e) => {
        setCondition({...condition, ["toggle"]: !condition.toggle});
        forceUpdate();
    }
    const setConditions = (conditions) => {
        setCondition({...condition, ["conditions"]: conditions})
    }
    const updateCondition = async(e) => {
        console.log(condition.conditions)
        toggleCondition()

        try{
            // Need to add userID
            const res = await axios.put('https://cz2006-nutrion.herokuapp.com/user/'+user.userId, {"healthCondition":condition.conditions});
            console.log(res);
            toggleCondition()
        }
        catch(error) {
            if(error.response){
                console.log(error.response.data);
            }
        }
    }

    // Lacking Nutrients
    const [nutrient, setNutrient] = useState({
        nutrients: props.user.lackingNutrient,
        toggle: false
    });
    const toggleNutrient = (e) => {
        setNutrient({...nutrient, ["toggle"]: !nutrient.toggle});
        forceUpdate();
    }
    const setNutrients = (nutrients) => {
        setNutrient({...nutrient, ["nutrients"]: nutrients})
    }
    const updateNutrient = async (e) => {
        console.log(nutrient.nutrients)

        try{
            // Need to add userID
            const res = await axios.put('https://cz2006-nutrion.herokuapp.com/user/'+user.userId, {"lackingNutrient":nutrient.nutrients});
            console.log(res);
            toggleNutrient()
        }
        catch(error) {
            if(error.response){
                console.log(error.response.data);
            }
        }
    }

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <ul>
                <div>
                    <li>
                        <a className="picture-anchor" href="#">
                            <h3>Profile Picture</h3>
                            <span className="items-settings">
                                <img className="profile-image" id="profile-picture" src={ profileimg } alt="Profile Picture"/>
                            </span>
                            <span className="edit-button">
                                <Button onClick={profilepic.toggle==true?updateProfilePic:toggleProfilePic} text={profilepic.toggle==true?"Update":"Edit"}/>
                            </span>
                            <span className={profilepic.toggle==true?"items-settings upload-image":"items-settings upload-image hide"}>
                                <label for="img">Upload image: </label>
                                <input type="file" id="profilepic" name="img" accept="image/*" onChange={handleProfilePicture}/>
                            </span>
                        </a>
                    </li>

                </div>
                
                {/* <div>
                    <li>
                        <a>
                            <h3>Username</h3>
                            <span className={username.toggle==true?"items-settings hide":"items-settings"}>{username.username}</span>
                            <span className={username.toggle==true?"items-settings":"items-settings hide"}>
                                <input onChange={(e)=>setUsername({...username, ["username"]: e.target.value})} className="input-settings" type="text" defaultValue={username.username}/>
                            </span>
                            <span className="edit-button">
                                <Button onClick={username.toggle==true?updateUsername:toggleUsername} text={username.toggle==true?"Update":"Edit"}/>
                            </span>
                        </a>
                    </li>

                </div> */}

                <li>
                    <a>
                        <h3>First Name</h3>
                        <span className={firstname.toggle==true?"items-settings hide":"items-settings"}>{firstname.firstname}</span>
                        <span className={firstname.toggle==true?"items-settings":"items-settings hide"}>
                            <input onChange={(e)=>setFirstName({...firstname, ["firstname"]: e.target.value})} className="input-settings" type="text" defaultValue={firstname.firstname}/>
                        </span>
                        <span className="edit-button">
                            <Button onClick={firstname.toggle==true?updateFirstName:toggleFirstName} text={firstname.toggle==true?"Update":"Edit"}/>
                        </span>
                    </a>
                </li>

                <li>
                    <a>
                        <h3>Last Name</h3>
                        <span className={lastname.toggle==true?"items-settings hide":"items-settings"}>{lastname.lastname}</span>
                        <span className={lastname.toggle==true?"items-settings":"items-settings hide"}>
                            <input onChange={(e)=>setLastName({...lastname, ["lastname"]: e.target.value})} className="input-settings" type="text" defaultValue={lastname.lastname}/>
                        </span>
                        <span className="edit-button">
                            <Button onClick={lastname.toggle==true?updateLastName:toggleLastName} text={lastname.toggle==true?"Update":"Edit"}/>
                        </span>
                    </a>
                </li>

                <li>
                    <a>
                        <h3>Email</h3>
                        <span className={email.toggle==true?"items-settings hide":"items-settings"}>{email.email}</span>
                        <span className={email.toggle==true?"items-settings":"items-settings hide"}>
                            <input onChange={(e)=>setEmail({...email, ["email"]: e.target.value})} className="input-settings" type="text" defaultValue={email.email}/>
                        </span>
                        <span className="edit-button">
                            <Button onClick={email.toggle==true?updateEmail:toggleEmail} text={email.toggle==true?"Update":"Edit"}/>
                        </span>
                    </a>
                </li>

                <li>
                    <a>
                        <h3>Password</h3>
                        <span className={password.toggle==true?"items-settings hide":"items-settings"}>******************</span>
                        <span className={password.toggle==true?"items-settings":"items-settings hide"}>
                            <input onChange={(e)=>setPassword({...password, ["password"]: e.target.value})} className="input-settings" type="password"/>
                        </span>
                        <span className="edit-button">
                            <Button onClick={password.toggle==true?updatePassword:togglePassword} text={password.toggle==true?"Update":"Edit"}/>
                        </span>
                    </a>
                </li>
                
                <li className={password.toggle==true?"items-settings":"items-settings hide"}>
                    <a>
                        <h3>Confirm Password</h3>
                        <span className={password.toggle==true?"items-settings":"items-settings hide"}>
                            <input onChange={(e)=>setConfirmPassword(e.target.value)} className="input-settings" type="password"/>
                        </span>
                    </a>
                </li>

                <li>
                    <a>
                        <h3>Health Conditions</h3>
                        <span className={condition.toggle==true?"items-settings hide":"items-settings"}>
                            {condition.conditions.map((condition) => (
                                condition + " | "
                            ))}
                        </span>
                        <span className={condition.toggle==true?"items-settings":"items-settings hide"}>
                        <CustomizedHook user={props.user} getConditions={setConditions} type="condition" />
                        </span>
                        <span className="edit-button">
                            <Button onClick={condition.toggle==true?updateCondition:toggleCondition} text={condition.toggle==true?"Update":"Edit"}/>
                        </span>
                    </a>
                </li>

                <li>
                    <a>
                        <h3>Lacking Nutrients</h3>
                        <span className={nutrient.toggle==true?"items-settings hide":"items-settings"}>
                            {nutrient.nutrients.map((nutrient) => (
                                nutrient + " | "
                            ))}
                        </span>
                        <span className={nutrient.toggle==true?"items-settings":"items-settings hide"}>
                            <CustomizedHook user={props.user} getNutrients={setNutrients} type="nutrient" />
                        </span>
                        <span className="edit-button">
                            <Button onClick={nutrient.toggle==true?updateNutrient:toggleNutrient} text={nutrient.toggle==true?"Update":"Edit"}/>
                        </span>
                    </a>
                </li>

                <li>
                    <a>
                        <h3>Height</h3>
                        <span className={height.toggle==true?"items-settings hide":"items-settings"}>{height.height}</span>
                        <span className={height.toggle==true?"items-settings":"items-settings hide"}>
                            <input onChange={(e)=>setHeight({...height, ["height"]: e.target.value})} className="input-settings" type="text" defaultValue={height.height}/>
                        </span>
                        <span className="edit-button">
                            <Button onClick={height.toggle==true?updateHeight:toggleHeight} text={height.toggle==true?"Update":"Edit"}/>
                        </span>
                    </a>
                </li>

                <li>
                    <a>
                        <h3>Weight</h3>
                        <span className={weight.toggle==true?"items-settings hide":"items-settings"}>{weight.weight}</span>
                        <span className={weight.toggle==true?"items-settings":"items-settings hide"}>
                            <input onChange={(e)=>setWeight({...weight, ["weight"]: e.target.value})} className="input-settings" type="text" defaultValue={weight.weight}/>
                        </span>
                        <span className="edit-button">
                            <Button onClick={weight.toggle==true?updateWeight:toggleWeight} text={weight.toggle==true?"Update":"Edit"}/>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    )
}
