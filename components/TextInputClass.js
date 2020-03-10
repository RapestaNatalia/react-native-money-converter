import React, { Component } from 'react';
import { TextInput } from 'react-native';
import Api from '../utils/Api.js';
import  {strings}  from '../constants/strings';

export default class TextInputClass extends Component {

  constructor(props) {
    super(props);
    this.state = {result:0};

  }
 setValueToConvert(val){
  this.props.setValueToConvert(val);
  }
  setResult(res){
    this.props.setResult(res);
  }

  render() {
    return (

        <TextInput
          keyboardType='numeric'
          placeholder={strings.enterNumber}
          style={{height: 50,width:150,padding:5, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.onChangeText(text,this.props.inputCurrencie,this.props.outputCurrencie)}
        />
    );
  }
  async onChangeText(t,i,o){
      this.setValueToConvert(t);
      let apiInstance = Api.getInstance();
      const res=await apiInstance.getLatestConversion(t,i,o);
      this.setState({result:res});
      this.setResult(res);
  }

}
