import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View,Button } from 'react-native';
import Api from '../utils/Api.js';

export default class ReverseCurrencie extends Component {
  constructor(props) {
    super(props);
    this.state = {result:0,loading:false};
   
  }
  setValueToConvert(val){
     this.props.setValueToConvert(val);
  }
  setReverseCurrencies(newInput,newOutput){
    this.props.setReverseValues(newInput,newOutput);
  }
  setResult(res){
    this.props.setResult(res);
  }
  render() {
    return (
     <Button
        onPress={()=>this.callApi(this.props.valueToConvert,this.props.inputCurrencie,this.props.outputCurrencie)}
        title="ReverseCurrencie"
        color="#841584"
        accessibilityLabel="Put the input money as output money an vice versa."
      />
    );
  }
componentDidMount(){
this.setState({loading:true});
}
 async  callApi(text,input,output){
    if(this.state.loading){
       this.setReverseCurrencies(output,input);
       let apiInstance = Api.getInstance();
       var res= await apiInstance.getLatestConversion(text,output,input);
       this.setState({result:res});
       this.setResult(res);
    }

  }
}