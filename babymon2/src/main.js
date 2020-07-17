import React, {Component} from "react"

const firebase = require("firebase");
require("firebase/firestore");

// firebase.initializeApp({
//     apiKey: "AIzaSyB-LoQduOS7TkZvrlJyZy9lJp6RHoOouoI",
//     authDomain: "whyphy-babycare.firebaseapp.com",
//     databaseURL: "https://whyphy-babycare.firebaseio.com",
//     projectId: "whyphy-babycare",
//     storageBucket: "whyphy-babycare.appspot.com",
//     messagingSenderId: "197292710754",
//     appId: "1:197292710754:web:3b77d931633562c6a46a3b",
//     measurementId: "G-KZD8T3BT6C"
// });
//
// var db = firebase.firestore();
//
// var docRef = db.collection("readings").doc("toTO0cjNLV3ZE4OJObmR");


class Tails extends Component{
    state = {
        AccX : 0,
        AccY : 0,
        AccZ : 0,
        CO2 : 0,
        TVOC : 0,
        Temp : 0
    };

    constructor() {
        super();
    }



    // componentDidMount=() =>{
    //     const x = db.collection("readings").doc("toTO0cjNLV3ZE4OJObmR")
    //         .onSnapshot((doc) => {
    //             this.setState({AccX: doc.data()['AccX'],AccY: doc.data()['AccX'],AccZ: doc.data()['AccZ'],CO2: doc.data()['CO2'],TVOC: doc.data()['TVOC'],Temp: doc.data()['Temp']})
    //         }
    //         );
    // };
    // doFireBaseFile = () => {
    //     docRef.get().then((doc) => {
    //         if (doc.exists) {
    //             console.log("Document data:", doc.data());
    //             console.log(doc.data()['AccX']);
    //             console.log(doc.data()['AccY']);
    //             console.log(doc.data()['AccZ']);
    //             console.log(doc.data()['CO2']);
    //             console.log(doc.data()['TVOC']);
    //             console.log(doc.data()['Temp']);
    //             this.setState({AccX: doc.data()['AccX'],AccY: doc.data()['AccX'],AccZ: doc.data()['AccZ'],CO2: doc.data()['CO2'],TVOC: doc.data()['TVOC'],Temp: doc.data()['Temp']})
    //         } else {
    //             // doc.data() will be undefined in this case
    //             console.log("No such document!");
    //         }
    //     }).catch(function(error) {
    //         console.log("Error getting document:", error);
    //     });
    // };

    render(){
        console.log('props');
        return(
            <div className="alert alert-success" role="alert">
                <div>Hello
                    <p>Accelerometer X - axis: <span className={this.getBadgeClasses()}>{this.getAccX()}</span></p>
                    <p>Accelerometer Y - axis: <span className={this.getBadgeClasses()}>{this.getAccY()}</span></p>
                    <p>Accelerometer Z - axis: <span className={this.getBadgeClasses()}>{this.getAccZ()}</span></p>
                    <p>CO2: <span className={this.getBadgeClasses()}>{this.getCO2()}</span></p>
                    <p>TVOC: <span className={this.getBadgeClasses()}>{this.getTVOC()}</span></p>
                    <p>Temp: <span className={this.getBadgeClasses()}>{this.getTemp()}</span></p>
                </div>
            </div>
        );
    }
    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes +=  "primary";
        return classes;
    }

    getAccX(){
        let x = this.state['AccX'];
        return x
    }
    getAccY(){
        let x = this.state['AccY'];
        return x
    }
    getAccZ(){
        let x = this.state['AccZ'];
        return x
    }
    getCO2(){
        let x = this.state['CO2'];
        return x
    }
    getTVOC(){
        let x = this.state['TVOC'];
        return x
    }
    getTemp(){
        let x = this.state['Temp'];
        return x
    }

}

export default Tails;