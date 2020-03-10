import React, { Component } from "react";
import { Picker } from "react-native";
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
    let apiInstance = Api.getInstance();
    const res=await apiInstance.getLatestConversion(text,this.props.inputCurrencie,this.props.outputCurrencie);
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


