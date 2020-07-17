import React, {Component} from "react"
import CanvasJSReact from './canvasjs.react';
import CO2_TVOC from "./CO2_TVOC";
import Temp from "./Temp"
import Acc from "./Acc";
import Tails from "./main";
import {firestore} from "firebase";
const firebase = require("firebase");
require("firebase/firestore");

//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


firebase.initializeApp({
    apiKey: "AIzaSyB-LoQduOS7TkZvrlJyZy9lJp6RHoOouoI",
    authDomain: "whyphy-babycare.firebaseapp.com",
    databaseURL: "https://whyphy-babycare.firebaseio.com",
    projectId: "whyphy-babycare",
    storageBucket: "whyphy-babycare.appspot.com",
    messagingSenderId: "197292710754",
    appId: "1:197292710754:web:3b77d931633562c6a46a3b",
    measurementId: "G-KZD8T3BT6C"
});

var db = firebase.firestore();

const filename = "toTO0cjNLV3ZE4OJObmR";

class Wrapper extends Component{
    state = {
        Dab: db,
        elements :[
            {id : 1, name : 'CO2TVOC'},
            {id : 2, name : 'Temp'},
            {id : 3, name : 'Acc'}
        ],
        dataArrayCO2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        dataArrayTVOC: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        dataArrayTemp: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        dataArrayAccX: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        dataArrayAccY: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        dataArrayAccZ: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        dataArrayTime: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //firebase.firestore.Timestamp(0)
    };
    componentDidMount=() =>{
        const x = this.state.Dab.collection("Backup").doc("24Entry")
            .onSnapshot((doc) => {
                var CO2Ed = this.state["dataArrayCO2"];
                CO2Ed[23] = doc.data()['CO2'];
                var TVOCEd = this.state["dataArrayTVOC"];
                TVOCEd[23] = doc.data()['TVOC'];
                var TempEd = this.state["dataArrayTemp"];
                TempEd[23] = doc.data()['Temp'];
                var AccXEd = this.state["dataArrayAccX"];
                AccXEd[23] = doc.data()['AccX'];
                var AccYEd = this.state["dataArrayAccY"];
                AccYEd[23] = doc.data()['AccY'];
                var AccZEd = this.state["dataArrayAccZ"];
                AccZEd[23] = doc.data()['AccZ'];
                var TimeEd = this.state["dataArrayTime"];
                TimeEd[23] = doc.data()['Time'];
                this.state.Dab.collection("Backup").doc("1Entry").get().then((doc1) => {
                    CO2Ed[0] = doc1.data()['CO2'];
                    TVOCEd[0] = doc1.data()['TVOC'];
                    TempEd[0] = doc1.data()['Temp'];
                    AccXEd[0] = doc1.data()['AccX'];
                    AccYEd[0] = doc1.data()['AccY'];
                    AccZEd[0] = doc1.data()['AccZ'];
                    TimeEd[0] = doc1.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("2Entry").get().then((doc2) => {
                    CO2Ed[1] = doc2.data()['CO2'];
                    TVOCEd[1] = doc2.data()['TVOC'];
                    TempEd[1] = doc2.data()['Temp'];
                    AccXEd[1] = doc2.data()['AccX'];
                    AccYEd[1] = doc2.data()['AccY'];
                    AccZEd[1] = doc2.data()['AccZ'];
                    TimeEd[1] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("3Entry").get().then((doc2) => {
                    CO2Ed[2] = doc2.data()['CO2'];
                    TVOCEd[2] = doc2.data()['TVOC'];
                    TempEd[2] = doc2.data()['Temp'];
                    AccXEd[2] = doc2.data()['AccX'];
                    AccYEd[2] = doc2.data()['AccY'];
                    AccZEd[2] = doc2.data()['AccZ'];
                    TimeEd[2] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("4Entry").get().then((doc2) => {
                    CO2Ed[3] = doc2.data()['CO2'];
                    TVOCEd[3] = doc2.data()['TVOC'];
                    TempEd[3] = doc2.data()['Temp'];
                    AccXEd[3] = doc2.data()['AccX'];
                    AccYEd[3] = doc2.data()['AccY'];
                    AccZEd[3] = doc2.data()['AccZ'];
                    TimeEd[3] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("5Entry").get().then((doc2) => {
                    CO2Ed[4] = doc2.data()['CO2'];
                    TVOCEd[4] = doc2.data()['TVOC'];
                    TempEd[4] = doc2.data()['Temp'];
                    AccXEd[4] = doc2.data()['AccX'];
                    AccYEd[4] = doc2.data()['AccY'];
                    AccZEd[4] = doc2.data()['AccZ'];
                    TimeEd[4] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("6Entry").get().then((doc2) => {
                    CO2Ed[5] = doc2.data()['CO2'];
                    TVOCEd[5] = doc2.data()['TVOC'];
                    TempEd[5] = doc2.data()['Temp'];
                    AccXEd[5] = doc2.data()['AccX'];
                    AccYEd[5] = doc2.data()['AccY'];
                    AccZEd[5] = doc2.data()['AccZ'];
                    TimeEd[5] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("7Entry").get().then((doc2) => {
                    CO2Ed[6] = doc2.data()['CO2'];
                    TVOCEd[6] = doc2.data()['TVOC'];
                    TempEd[6] = doc2.data()['Temp'];
                    AccXEd[6] = doc2.data()['AccX'];
                    AccYEd[6] = doc2.data()['AccY'];
                    AccZEd[6] = doc2.data()['AccZ'];
                    TimeEd[6] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("8Entry").get().then((doc2) => {
                    let i = 7;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("9Entry").get().then((doc2) => {
                    let i = 8;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("10Entry").get().then((doc2) => {
                    let i = 9;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("11Entry").get().then((doc2) => {
                    let i = 10;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("12Entry").get().then((doc2) => {
                    let i = 11;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("13Entry").get().then((doc2) => {
                    let i = 12;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("14Entry").get().then((doc2) => {
                    let i = 13;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("15Entry").get().then((doc2) => {
                    let i = 14;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("16Entry").get().then((doc2) => {
                    let i = 15;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("17Entry").get().then((doc2) => {
                    let i = 16;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("18Entry").get().then((doc2) => {
                    let i = 17;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("19Entry").get().then((doc2) => {
                    let i = 18;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("20Entry").get().then((doc2) => {
                    let i = 19;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("21Entry").get().then((doc2) => {
                    let i = 20;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("22Entry").get().then((doc2) => {
                    let i = 21;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("23Entry").get().then((doc2) => {
                    let i = 22;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.state.Dab.collection("Backup").doc("24Entry").get().then((doc2) => {
                    let i = 23;
                    CO2Ed[i] = doc2.data()['CO2'];
                    TVOCEd[i] = doc2.data()['TVOC'];
                    TempEd[i] = doc2.data()['Temp'];
                    AccXEd[i] = doc2.data()['AccX'];
                    AccYEd[i] = doc2.data()['AccY'];
                    AccZEd[i] = doc2.data()['AccZ'];
                    TimeEd[i] = doc2.data()['Time'];
                });
                this.setState({dataArrayCO2: CO2Ed, dataArrayTVOC: TVOCEd, dataArrayTemp: TempEd, dataArrayAccX: AccXEd, dataArrayAccY: AccYEd, dataArrayAccZ: AccZEd, dataArrayTime: TimeEd});
                console.log(this.state);
                }
            );
    };

    render() {
        return (
            <div>
                <div class="card text-center">
                    <div class="card-header">
                        Air Quality Reading
                    </div>
                    <div class="card-body">
                        <h5 className="card-title">CO2 and TVOC Readings</h5>
                        <CO2_TVOC key={1}  name={'CO2TVOC'}  DB={db} CO2Array={this.state['dataArrayCO2']} TVOCArray={this.state.dataArrayTVOC} TimeArray={this.state.dataArrayTime}/>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="card-header">
                        Temperature Reading
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Temperature Readings</h5>
                        <Temp key={1} name={'Temp'} DB={db} TempArray={this.state.dataArrayTemp} TimeArray={this.state.dataArrayTime}/>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="card-header">
                        Acceleration Reading
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Acceleration Readings</h5>
                        <Acc key={2} name={'Acc'} DB={db} AccXArray={this.state.dataArrayAccX} AccYArray={this.state.dataArrayAccY} AccZArray={this.state.dataArrayAccZ} TimeArray={this.state.dataArrayTime}/>
                    </div>
                </div>



            </div>

        );
    }


}
export default Wrapper;