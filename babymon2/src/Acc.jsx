import React, {Component} from "react"
import CanvasJSReact from './canvasjs.react';
import Tails from "./main";
import Modal from "react-bootstrap/Modal";
const firebase = require("firebase");
require("firebase/firestore");


//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Acc extends Component{
    state = {
        AccX : 0,
        AccY : 0,
        AccZ : 0,
        show: false,
        Dab : this.props.DB
    };
    componentDidMount=() =>{
        const x = this.state.Dab.collection("readings").doc("toTO0cjNLV3ZE4OJObmR")
            .onSnapshot((doc) => {
                    this.setState({AccX: doc.data()['AccX'],AccY: doc.data()['AccY'], AccZ: doc.data()['AccZ']});

                    if(this.computeAcc() > 9.0){
                        this.showModal();
                    }
                    else{
                        this.hideModal();
                    }
                }
            );
    };
    toggleDataSeries = (e) =>{
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else{
            e.dataSeries.visible = true;
        }
        this.chart.render();
    };
    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };
    render() {

        console.log(this.props.AccXArray);
        const options = {
            animationEnabled: true,
            zoomEnabled: true,
            theme: "light2",
            title: {
                test: "Accelerometer readings"
            },
            subtitles: [{
                text: "Click Legend to Hide or Unhide Data Series"
            }],
            axisX:{
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                },
                labelFormatter: function (e) {
                    return CanvasJS.formatDate( e.value, "DDDD MMM YYYY HH:mm:ss k");
                },
            },
            axisY: {
                title: "m/s^2",
                titleFontColor: "#6D78AD",
                lineColor: "#6D78AD",
                labelFontColor: "#6D78AD",
                tickColor: "#6D78AD",
                includeZero: false,
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            legend: {
                cursor: "pointer",
                itemclick: this.toggleDataSeries
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "spline",
                showInLegend: true,
                name: "Total Acceleration",
                dataPoints: [
                    { label: this.props.TimeArray[0],  y:  this.props.AccXArray[0]},
                    { label: this.props.TimeArray[1],  y:  this.props.AccXArray[1]},
                    { label: this.props.TimeArray[2],  y:  this.props.AccXArray[2]},
                    { label: this.props.TimeArray[3],  y:  this.props.AccXArray[3]},
                    { label: this.props.TimeArray[4],  y:  this.props.AccXArray[4]},
                    { label: this.props.TimeArray[5],  y:  this.props.AccXArray[5]},
                    { label: this.props.TimeArray[6],  y:  this.props.AccXArray[6]},
                    { label: this.props.TimeArray[7],  y:  this.props.AccXArray[7]},
                    { label: this.props.TimeArray[8],  y:  this.props.AccXArray[8]},
                    { label: this.props.TimeArray[9],  y:  this.props.AccXArray[9]},
                    { label: this.props.TimeArray[10],  y:  this.props.AccXArray[10]},
                    { label: this.props.TimeArray[11],  y:  this.props.AccXArray[11]},
                    { label: this.props.TimeArray[12],  y:  this.props.AccXArray[12]},
                    { label: this.props.TimeArray[13],  y:  this.props.AccXArray[13]},
                    { label: this.props.TimeArray[14],  y:  this.props.AccXArray[14]},
                    { label: this.props.TimeArray[15],  y:  this.props.AccXArray[15]},
                    { label: this.props.TimeArray[16],  y:  this.props.AccXArray[16]},
                    { label: this.props.TimeArray[17],  y:  this.props.AccXArray[17]},
                    { label: this.props.TimeArray[18],  y:  this.props.AccXArray[18]},
                    { label: this.props.TimeArray[19],  y:  this.props.AccXArray[19]},
                    { label: this.props.TimeArray[20],  y:  this.props.AccXArray[20]},
                    { label: this.props.TimeArray[21],  y:  this.props.AccXArray[21]},
                    { label: this.props.TimeArray[22],  y:  this.props.AccXArray[22]},
                    { label: this.props.TimeArray[23],  y:  this.props.AccXArray[23]},

                ]
            },
                {
                    type: "spline",
                    showInLegend: true,
                    name: "Total Acceleration",
                    dataPoints: [
                        { label: this.props.TimeArray[0],  y:  this.props.AccYArray[0]},
                        { label: this.props.TimeArray[1],  y:  this.props.AccYArray[1]},
                        { label: this.props.TimeArray[2],  y:  this.props.AccYArray[2]},
                        { label: this.props.TimeArray[3],  y:  this.props.AccYArray[3]},
                        { label: this.props.TimeArray[4],  y:  this.props.AccYArray[4]},
                        { label: this.props.TimeArray[5],  y:  this.props.AccYArray[5]},
                        { label: this.props.TimeArray[6],  y:  this.props.AccYArray[6]},
                        { label: this.props.TimeArray[7],  y:  this.props.AccYArray[7]},
                        { label: this.props.TimeArray[8],  y:  this.props.AccYArray[8]},
                        { label: this.props.TimeArray[9],  y:  this.props.AccYArray[9]},
                        { label: this.props.TimeArray[10],  y:  this.props.AccYArray[10]},
                        { label: this.props.TimeArray[11],  y:  this.props.AccYArray[11]},
                        { label: this.props.TimeArray[12],  y:  this.props.AccYArray[12]},
                        { label: this.props.TimeArray[13],  y:  this.props.AccYArray[13]},
                        { label: this.props.TimeArray[14],  y:  this.props.AccYArray[14]},
                        { label: this.props.TimeArray[15],  y:  this.props.AccYArray[15]},
                        { label: this.props.TimeArray[16],  y:  this.props.AccYArray[16]},
                        { label: this.props.TimeArray[17],  y:  this.props.AccYArray[17]},
                        { label: this.props.TimeArray[18],  y:  this.props.AccYArray[18]},
                        { label: this.props.TimeArray[19],  y:  this.props.AccYArray[19]},
                        { label: this.props.TimeArray[20],  y:  this.props.AccYArray[20]},
                        { label: this.props.TimeArray[21],  y:  this.props.AccYArray[21]},
                        { label: this.props.TimeArray[22],  y:  this.props.AccYArray[22]},
                        { label: this.props.TimeArray[23],  y:  this.props.AccYArray[23]},

                    ]
                },
                {
                    type: "spline",
                    showInLegend: true,
                    name: "Total Acceleration",
                    dataPoints: [
                        { label: this.props.TimeArray[0],  y:  this.props.AccZArray[0]},
                        { label: this.props.TimeArray[1],  y:  this.props.AccZArray[1]},
                        { label: this.props.TimeArray[2],  y:  this.props.AccZArray[2]},
                        { label: this.props.TimeArray[3],  y:  this.props.AccZArray[3]},
                        { label: this.props.TimeArray[4],  y:  this.props.AccZArray[4]},
                        { label: this.props.TimeArray[5],  y:  this.props.AccZArray[5]},
                        { label: this.props.TimeArray[6],  y:  this.props.AccZArray[6]},
                        { label: this.props.TimeArray[7],  y:  this.props.AccZArray[7]},
                        { label: this.props.TimeArray[8],  y:  this.props.AccZArray[8]},
                        { label: this.props.TimeArray[9],  y:  this.props.AccZArray[9]},
                        { label: this.props.TimeArray[10],  y:  this.props.AccZArray[10]},
                        { label: this.props.TimeArray[11],  y:  this.props.AccZArray[11]},
                        { label: this.props.TimeArray[12],  y:  this.props.AccZArray[12]},
                        { label: this.props.TimeArray[13],  y:  this.props.AccZArray[13]},
                        { label: this.props.TimeArray[14],  y:  this.props.AccZArray[14]},
                        { label: this.props.TimeArray[15],  y:  this.props.AccZArray[15]},
                        { label: this.props.TimeArray[16],  y:  this.props.AccZArray[16]},
                        { label: this.props.TimeArray[17],  y:  this.props.AccZArray[17]},
                        { label: this.props.TimeArray[18],  y:  this.props.AccZArray[18]},
                        { label: this.props.TimeArray[19],  y:  this.props.AccZArray[19]},
                        { label: this.props.TimeArray[20],  y:  this.props.AccZArray[20]},
                        { label: this.props.TimeArray[21],  y:  this.props.AccZArray[21]},
                        { label: this.props.TimeArray[22],  y:  this.props.AccZArray[22]},
                        { label: this.props.TimeArray[23],  y:  this.props.AccZArray[23]},

                    ]
                }
            ]
        };

        console.log("I am a dick");
        return (
            <div className="alert alert-info" role="alert">
                <div style={{backgroundColor: "transparent"}} className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4"><p className={this.getAccColours()}>{this.computeAcc()} m/s<sup>2</sup></p></h1>
                        <p className="lead">The current Acceleration</p>
                    </div>
                </div>
                <p>
                    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#AccChart" aria-expanded="true" aria-controls="AccChart">
                        Toggle 24Hr graph
                    </button>
                </p>
                <div className="collapse show" id="AccChart">
                    <div className="card card-body">
                        <CanvasJSChart options = {options}
                                       onRef={ref => this.chart = ref}
                        />
                    </div>
                </div>

                <Modal show={this.state.show} >
                    <Modal.Header>
                        <Modal.Title>Alert excessive acceleration detected</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Attend to your child, they may have fallen</Modal.Body>
                    <Modal.Footer>
                        This message will clear when baby has been attended to
                    </Modal.Footer>
                </Modal>
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
    computeAcc = () =>{
        let x = Math.sqrt((this.state['AccZ']**2) + (this.state['AccY']**2) + (this.state['AccX']**2));
        return Math.round(x * 100) / 100
    };
    computAccxyz = (x, y, z) =>{
        let p = Math.sqrt((x**2) + (y**2) + (z**2));
        return Math.round(p * 100) / 100
    };
    getAccColours = () =>{
        if (this.computeAcc() < 9){
            return "text-success"
        }
        else{
            return "text-danger"
        }
    };

}
export default Acc;