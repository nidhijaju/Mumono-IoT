import React, {Component} from "react"
import CanvasJSReact from './canvasjs.react';

import Tails from "./main";
const firebase = require("firebase");
require("firebase/firestore");

//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Temp extends Component{
    state = {
        Temp : 0,
        Dab : this.props.DB
    };
    componentDidMount=() =>{
        const x = this.state.Dab.collection("readings").doc("toTO0cjNLV3ZE4OJObmR")
            .onSnapshot((doc) => {
                    this.setState({Temp: doc.data()['Temp']})
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
    render() {
        const options = {
            animationEnabled: true,
            zoomEnabled: true,
            theme: "light2",
            title: {
                test: "Temp Readings"
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
                title: "Degrees Celcius",
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
                name: "Temperature",
                dataPoints: [
                    { label: this.props.TimeArray[0],  y:  this.props.TempArray[0]},
                    { label: this.props.TimeArray[1],  y:  this.props.TempArray[1]},
                    { label: this.props.TimeArray[2],  y:  this.props.TempArray[2]},
                    { label: this.props.TimeArray[3],  y:  this.props.TempArray[3]},
                    { label: this.props.TimeArray[4],  y:  this.props.TempArray[4]},
                    { label: this.props.TimeArray[5],  y:  this.props.TempArray[5]},
                    { label: this.props.TimeArray[6],  y:  this.props.TempArray[6]},
                    { label: this.props.TimeArray[7],  y:  this.props.TempArray[7]},
                    { label: this.props.TimeArray[8],  y:  this.props.TempArray[8]},
                    { label: this.props.TimeArray[9],  y:  this.props.TempArray[9]},
                    { label: this.props.TimeArray[10],  y:  this.props.TempArray[10]},
                    { label: this.props.TimeArray[11],  y:  this.props.TempArray[11]},
                    { label: this.props.TimeArray[12],  y:  this.props.TempArray[12]},
                    { label: this.props.TimeArray[13],  y:  this.props.TempArray[13]},
                    { label: this.props.TimeArray[14],  y:  this.props.TempArray[14]},
                    { label: this.props.TimeArray[15],  y:  this.props.TempArray[15]},
                    { label: this.props.TimeArray[16],  y:  this.props.TempArray[16]},
                    { label: this.props.TimeArray[17],  y:  this.props.TempArray[17]},
                    { label: this.props.TimeArray[18],  y:  this.props.TempArray[18]},
                    { label: this.props.TimeArray[19],  y:  this.props.TempArray[19]},
                    { label: this.props.TimeArray[20],  y:  this.props.TempArray[20]},
                    { label: this.props.TimeArray[21],  y:  this.props.TempArray[21]},
                    { label: this.props.TimeArray[22],  y:  this.props.TempArray[22]},
                    { label: this.props.TimeArray[23],  y:  this.props.TempArray[23]},
                ]
            }]
        };


        return (
            <div className="alert alert-info" role="alert">
                <div style={{backgroundColor: "transparent"}} className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4"><p className={this.getTempColour()}>{this.getTemp()} <sup>o</sup> C</p></h1>
                        <p className="lead">The current Temperature</p>
                    </div>
                </div>
                <p>
                    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#TempChart" aria-expanded="true" aria-controls="TempChart">
                        Toggle 24Hr graph
                    </button>
                </p>
                <div className="collapse show" id="TempChart">
                    <div className="card card-body">
                        <CanvasJSChart options = {options}
                                       onRef={ref => this.chart = ref}
                        />
                    </div>
                </div>
            </div>
        );
    }
    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes +=  "primary";
        return classes;
    }
    getTempColour(){
        if (this.getTemp() < 40){
            return "text-success"
        }
        else{
            return "text-danger"
        }
    }
    getTemp(){
        let x = this.state['Temp'];
        return Math.round(x * 10) / 10
    }


}
export default Temp;