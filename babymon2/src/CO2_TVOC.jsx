import React, {Component} from "react"
import CanvasJSReact from './canvasjs.react';
import 'bootstrap/dist/css/bootstrap.css';
import Tails from "./main";
const firebase = require("firebase");
require("firebase/firestore");

//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class CO2_TVOC extends Component{
    state = {
        CO2: 0,
        TVOC: 0,
        Dab : this.props.DB,
        Shown : false
    };

    componentDidMount=() =>{
        const x = this.state.Dab.collection("readings").doc("toTO0cjNLV3ZE4OJObmR")
            .onSnapshot((doc) => {
                    this.setState({CO2: doc.data()['CO2'],TVOC: doc.data()['TVOC']})
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
                test: "CO2 and TVOC Readings"
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
                }
            },
            axisY: {
                title: "Parts per Million",
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
            axisY2: {
                title: "Parts per billion",
                titleFontColor: "#51CDA0",
                lineColor: "#51CDA0",
                labelFontColor: "#51CDA0",
                tickColor: "#51CDA0",
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
                    { label: this.props.TimeArray[0],  y:  this.props.CO2Array[0]},
                    { label: this.props.TimeArray[1],  y:  this.props.CO2Array[1]},
                    { label: this.props.TimeArray[2],  y:  this.props.CO2Array[2]},
                    { label: this.props.TimeArray[3],  y:  this.props.CO2Array[3]},
                    { label: this.props.TimeArray[4],  y:  this.props.CO2Array[4]},
                    { label: this.props.TimeArray[5],  y:  this.props.CO2Array[5]},
                    { label: this.props.TimeArray[6],  y:  this.props.CO2Array[6]},
                    { label: this.props.TimeArray[7],  y:  this.props.CO2Array[7]},
                    { label: this.props.TimeArray[8],  y:  this.props.CO2Array[8]},
                    { label: this.props.TimeArray[9],  y:  this.props.CO2Array[9]},
                    { label: this.props.TimeArray[10],  y:  this.props.CO2Array[10]},
                    { label: this.props.TimeArray[11],  y:  this.props.CO2Array[11]},
                    { label: this.props.TimeArray[12],  y:  this.props.CO2Array[12]},
                    { label: this.props.TimeArray[13],  y:  this.props.CO2Array[13]},
                    { label: this.props.TimeArray[14],  y:  this.props.CO2Array[14]},
                    { label: this.props.TimeArray[15],  y:  this.props.CO2Array[15]},
                    { label: this.props.TimeArray[16],  y:  this.props.CO2Array[16]},
                    { label: this.props.TimeArray[17],  y:  this.props.CO2Array[17]},
                    { label: this.props.TimeArray[18],  y:  this.props.CO2Array[18]},
                    { label: this.props.TimeArray[19],  y:  this.props.CO2Array[19]},
                    { label: this.props.TimeArray[20],  y:  this.props.CO2Array[20]},
                    { label: this.props.TimeArray[21],  y:  this.props.CO2Array[21]},
                    { label: this.props.TimeArray[22],  y:  this.props.CO2Array[22]},
                    { label: this.props.TimeArray[23],  y:  this.props.CO2Array[23]},

                ]
            },
                {
                    type: "spline",
                    showInLegend: true,
                    name: "Total Acceleration",
                    dataPoints: [
                        { label: this.props.TimeArray[0],  y:  this.props.TVOCArray[0]},
                        { label: this.props.TimeArray[1],  y:  this.props.TVOCArray[1]},
                        { label: this.props.TimeArray[2],  y:  this.props.TVOCArray[2]},
                        { label: this.props.TimeArray[3],  y:  this.props.TVOCArray[3]},
                        { label: this.props.TimeArray[4],  y:  this.props.TVOCArray[4]},
                        { label: this.props.TimeArray[5],  y:  this.props.TVOCArray[5]},
                        { label: this.props.TimeArray[6],  y:  this.props.TVOCArray[6]},
                        { label: this.props.TimeArray[7],  y:  this.props.TVOCArray[7]},
                        { label: this.props.TimeArray[8],  y:  this.props.TVOCArray[8]},
                        { label: this.props.TimeArray[9],  y:  this.props.TVOCArray[9]},
                        { label: this.props.TimeArray[10],  y:  this.props.TVOCArray[10]},
                        { label: this.props.TimeArray[11],  y:  this.props.TVOCArray[11]},
                        { label: this.props.TimeArray[12],  y:  this.props.TVOCArray[12]},
                        { label: this.props.TimeArray[13],  y:  this.props.TVOCArray[13]},
                        { label: this.props.TimeArray[14],  y:  this.props.TVOCArray[14]},
                        { label: this.props.TimeArray[15],  y:  this.props.TVOCArray[15]},
                        { label: this.props.TimeArray[16],  y:  this.props.TVOCArray[16]},
                        { label: this.props.TimeArray[17],  y:  this.props.TVOCArray[17]},
                        { label: this.props.TimeArray[18],  y:  this.props.TVOCArray[18]},
                        { label: this.props.TimeArray[19],  y:  this.props.TVOCArray[19]},
                        { label: this.props.TimeArray[20],  y:  this.props.TVOCArray[20]},
                        { label: this.props.TimeArray[21],  y:  this.props.TVOCArray[21]},
                        { label: this.props.TimeArray[22],  y:  this.props.TVOCArray[22]},
                        { label: this.props.TimeArray[23],  y:  this.props.TVOCArray[23]},

                    ]
                }
                ]
        };


        return (
            <div className="alert alert-info" role="alert">
                <div style={{backgroundColor: "transparent"}} className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4"><p className={this.getCO2Colour()}>{this.getCO2()} ppm</p></h1>
                        <p className="lead">The current CO2 reading</p>
                    </div>
                </div>
                <div style={{backgroundColor: "transparent"}} className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4"><p className={this.getTVOCColour()}>{this.getTVOC()} ppb</p></h1>
                        <p className="lead">The current TVOC reading</p>
                    </div>
                </div>
                <p>
                    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#CO2Chart" aria-expanded="true" aria-controls="CO2Chart">
                        Toggle 24Hr graph
                    </button>
                </p>
                <div className="collapse show" id="CO2Chart">
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
    getCO2Colour(){
        if (this.getCO2() < 700){
            return "text-success"
        }
        else{
            return "text-danger"
        }
    }
    getTVOCColour(){
        if (this.getCO2() > 50){
            return "text-success"
        }
        else{
            return "text-danger"
        }
    }
    getCO2(){
        let x = this.state['CO2'];
        return x
    }
    getTVOC(){
        let x = this.state['TVOC'];
        return x
    }
    getWords = () =>{
      if (this.state.Shown){
          return "Hide "
      }
      else{
          return "Show x"
      }
    };

}
export default CO2_TVOC;