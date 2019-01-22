/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, View, Button, Picker, Alert } from "react-native";
import Api from '../utils/Api.js';

export default class PickerMoney extends Component {

  constructor(props){
     super(props);

   }


  setCurrencie(val){
    this.props.onSelect(val);
  }
  setResult(res){
    this.props.setResult(res);
  }
  render() {
    return (
     
      <Picker
      
           selectedValue={this.props.selected}
           onValueChange={(itemValue, itemIndex) =>this.changeValue(itemValue,this.props.valueToConvert) } >
          
           {this.props.currencies.map(function(object, i){
            return <Picker.Item key ={object+i} value={object} label={object}/> ;

           })}

         </Picker>        
     
    );
  }
  async changeValue(val,text){

    this.setState({PickerSelectedVal: val});
    this.setCurrencie(val);
    await this.promisedSetState({PickerSelectedVal: val},this.setCurrencie);
    console.log("output after promise:"+this.props.outputCurrencie);
    let apiInstance = Api.getInstance();
    const res=await apiInstance.getLatestConversion(text,this.props.inputCurrencie,this.props.outputCurrencie);
    console.log(res);
    this.setState({result:res});
    this.setResult(res);
  }  
    promisedSetState = (newState,callback) => {
        return new Promise((callback) => {
            this.setState(newState, () => {
                callback(newState);
            });
        });
    }
}


