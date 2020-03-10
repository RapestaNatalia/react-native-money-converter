import  {strings}  from '../constants/strings';

const BASE_API='https://openexchangerates.org/api/';
const APP_ID='78903118863a4e5cb5ad3335bf887186';
const MILISECONDS_UPDATE=3600000;

export default class Api{

static myInstance = null;

_latestRates=null;

static getInstance() {
        if (Api.myInstance == null) {
            Api.myInstance = new Api();
        }
        return this.myInstance;
 }
getLatestRates(){
	return this._latestRates;
}

async getCurrencies(){
			try {

		    let response = await fetch(
		      BASE_API+'currencies.json',
		    );
		        let responseJson = await response.json();
		    var moneys=[];
		    moneys=Object.keys(responseJson);
	        return moneys;

		  } catch (error) {
		  	return "error";
		    console.error(error);
		  }

	}


  async getLatestConversion(text,i,o){
  	     if(this._latestRates==null){

  	    	  try {
			    let response = await fetch(
			      BASE_API+'latest.json?app_id='+APP_ID,
			    );
			     this._latestRates = await response.json();
			  } catch (error) {
			    console.error(error);
			    return "error";
			  }

  	    }else if(this._latestRates!=null)
  	    {
	        var date = new Date();
  	        var timestamp = (date.getTime())/1000;
  	    	var resta=timestamp-(this._latestRates["timestamp"]);
  	    	if(resta>MILISECONDS_UPDATE)
  	    	{
  	    	 try {
			    let response = await fetch(
			      BASE_API+'latest.json?app_id='+APP_ID,
			    );
			     this._latestRates = await response.json();
			  } catch (error) {
			    console.error(error);
			     return "error";
			  }
  	    	}
		}
	  if(this._latestRates!=null){
	    var input=i;
	    var output=o;
	    var base=this._latestRates["base"];
	    if(text){
			  if(base===input){
			    var converValue=this._latestRates["rates"][output];
			    if(converValue){
			      var result=parseFloat(text)*converValue;
			  	  var roundedResult=Math.round(result*1000)/1000;
			      if(isNaN(roundedResult)){
			      	return strings.checkInput
			      }else if(roundedResult<0){
			      	return strings.checkInput
			      }
			      else{
			      	return roundedResult;
			      }

			    }
			  }else{
			      var result=parseFloat(text)*(1/this._latestRates["rates"][input]);
			      var roundedResult=Math.round(result*1000)/1000;
			       if(isNaN(roundedResult)){
			      	return strings.checkInput
			      }else if(roundedResult<0){
			      	return strings.checkInput
			      }
			      else{
			      	return roundedResult;
			      }
			  }

		}else{
			return strings.enterNumber
		}

	}
	}
}

