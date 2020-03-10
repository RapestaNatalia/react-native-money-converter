import React from 'react';
import { StyleSheet, Text, View,YellowBox } from 'react-native';
import PickerMoney from './components/Picker';
import TextInputClass from './components/TextInputClass';
import Api from './utils/Api.js';
import ReverseCurrencie from './components/ReverseCurrencie';
import { theme } from './constants/theme';


export default class App extends React.Component {

  constructor(props){
    super(props);
    YellowBox.ignoreWarnings(['Remote debugger...']);
    this.state={
      loading:true,
      currencies:[],
      inputCurrencie:'USD',
      outputCurrencie:'ARS',
      valueToConvert:0,
      result:''
    }
  }
    setInputCurrencie = (val) =>{
   if(val)
     this.setState({inputCurrencie:val });
  }
   setOutputCurrencie = (val) => {
    if(val)
      this.setState({outputCurrencie:val });
   }
  setValueToConvert = (val) =>{
  if(val)
    this.setState({
      valueToConvert:val
    });
  }
  setReverseValues = (newInput,newOutput) =>{
    this.setState({
      inputCurrencie:newInput,
      outputCurrencie:newOutput
    });
  }
  setResult= (val) =>{
    this.setState({
      result:val
    });
  }
  async componentDidMount(){
    let apiInstance = Api.getInstance();

    this.setState({loading:true});
    const moneys=await apiInstance.getCurrencies();
      this.setState({
        currencies:moneys,
          loading:false
      })
  }



  render() {
      if(this.state.loading){
      return(
        <View style={styles.container}>
        <Text style={styles.loading}> Loading...</Text>
        </View>
        );
       }

      return (

        <View style={styles.container}>
          <Text style={styles.presentationText}>Currency conversion</Text>
          <View >
            <PickerMoney   currencies={this.state.currencies} valueToConvert={this.state.valueToConvert} setResult={this.setResult} inputCurrencie={this.state.inputCurrencie} outputCurrencie={this.state.outputCurrencie} setValueToConvert={this.setValueToConvert} onSelect={this.setInputCurrencie} selected={this.state.inputCurrencie}/>
            <TextInputClass  setResult={this.setResult} inputCurrencie={this.state.inputCurrencie} outputCurrencie={this.state.outputCurrencie} setValueToConvert={this.setValueToConvert}/>
         </View>
          <View >
            <PickerMoney  currencies={this.state.currencies}  valueToConvert={this.state.valueToConvert} setResult={this.setResult} inputCurrencie={this.state.inputCurrencie} outputCurrencie={this.state.outputCurrencie} setValueToConvert={this.setValueToConvert} onSelect={this.setOutputCurrencie} selected={this.state.outputCurrencie}/>
            <Text style={styles.text}>{this.state.result}</Text>
          </View>
          <View style={styles.reverse}>
            <ReverseCurrencie style={styles.button} setResult={this.setResult} valueToConvert={this.state.valueToConvert} inputCurrencie={this.state.inputCurrencie} outputCurrencie={this.state.outputCurrencie} setValueToConvert={this.setValueToConvert} setReverseValues={this.setReverseValues}/>
          </View>
         </View>

      );


  }
}


const styles = StyleSheet.create({
  container: {
    height: 500,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.white

  },
  loading:{
    fontStyle:'italic',
    fontSize:30,
    color:theme.color.violet
  },
  text:{
    height: 50,
    width:150,
    padding:5,
    borderColor: theme.color.black,
    borderWidth: 1
  },
  reverse:{
    margin:20
  },
 rows:{
    height: 50,
    flexDirection: 'row'
 },
 presentationText:{
    fontWeight:'bold',
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color:"#841584"
 }
});
