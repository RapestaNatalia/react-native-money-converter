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
        console.log(this.myInstance);
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
		  //Código utilizado para testear sin consumir requests
		 /* var responseJson = {
		  				'USD':'United State Dolar',
		  				'ARS':'Argentina',
		  				'AED': "United Arab Emirates Dirham",
		                'AFN': "Afghan Afghani",
		                'ALL': "Albanian Lek"};*/
		    var moneys=[];
		    console.log(Object.keys(responseJson));
		    moneys=Object.keys(responseJson);
	        return moneys;

		  } catch (error) {
		  	return "error";
		    console.error(error);
		  }

	}


  async getLatestConversion(text,i,o){
  	    //chequeo para que se haga un fetch unicamente cuando es necesario.
  	     if(this._latestRates==null){

  	    	  try {
			    let response = await fetch(
			      BASE_API+'latest.json?app_id='+APP_ID,
			    );
			     this._latestRates = await response.json(); 
			     console.log("result 1er:"+this._latestRates);
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
				 console.log("result after 1er:"+this._latestRates);
			  } catch (error) {
			    console.error(error);
			     return "error";
			  }
  	    	}
		}
    //Código utilizado para testear sin consumir requests

	/* this._latestRates={
	  "disclaimer": "Usage subject to terms: https://openexchangerates.org/terms",
	  "license": "https://openexchangerates.org/license",
	  "timestamp": 1547236800,
	  "base": "USD",
	  "rates": {
	    "AED": 3.673096,
	    "AFN": 75.449606,
	    "ALL": 109.71,
	    "AMD": 485.899674,
	    "ANG": 1.774825,
	    "AOA": 310.252,
	    "ARS": 36.903887,
	    "AUD": 1.387505,
	    "AWG": 1.800506,
	    "AZN": 1.7025,
	    "BAM": 1.695843,
	    "BBD": 2,
	    "BDT": 83.712,
	    "BGN": 1.702545,
	    "BHD": 0.376923,
	    "BIF": 1816,
	    "BMD": 1,
	    "BND": 1.57573,
	    "BOB": 6.90915,
	    "BRL": 3.713722,
	    "BSD": 1,
	    "BTC": 0.000272659057,
	    "BTN": 70.438195,
	    "BWP": 10.481001,
	    "BYN": 2.150356,
	    "BZD": 2.015534,
	    "CAD": 1.327161,
	    "CDF": 1626,
	    "CHF": 0.984459,
	    "CLF": 0.02338,
	    "CLP": 674.877679,
	    "CNH": 6.760895,
	    "CNY": 6.7627,
	    "COP": 3156.371786,
	    "CRC": 605.685032,
	    "CUC": 1,
	    "CUP": 25.75,
	    "CVE": 96.0755,
	    "CZK": 22.284506,
	    "DJF": 178,
	    "DKK": 6.510737,
	    "DOP": 50.495,
	    "DZD": 117.96,
	    "EGP": 17.9285,
	    "ERN": 14.99809,
	    "ETB": 28.505,
	    "EUR": 0.872208,
	    "FJD": 2.118648,
	    "FKP": 0.778491,
	    "GBP": 0.778491,
	    "GEL": 2.665,
	    "GGP": 0.778491,
	    "GHS": 4.885,
	    "GIP": 0.778491,
	    "GMD": 49.505,
	    "GNF": 9200,
	    "GTQ": 7.726796,
	    "GYD": 208.939318,
	    "HKD": 7.83977,
	    "HNL": 24.410013,
	    "HRK": 6.478997,
	    "HTG": 77.730941,
	    "HUF": 280.132907,
	    "IDR": 14120.403995,
	    "ILS": 3.67335,
	    "IMP": 0.778491,
	    "INR": 70.383589,
	    "IQD": 1190,
	    "IRR": 42744.958797,
	    "ISK": 120.630096,
	    "JEP": 0.778491,
	    "JMD": 128.45,
	    "JOD": 0.709607,
	    "JPY": 108.495375,
	    "KES": 101.74,
	    "KGS": 68.708449,
	    "KHR": 4020,
	    "KMF": 427.298012,
	    "KPW": 900,
	    "KRW": 1118.365,
	    "KWD": 0.302822,
	    "KYD": 0.833267,
	    "KZT": 376.74694,
	    "LAK": 8550,
	    "LBP": 1507.95,
	    "LKR": 181.928311,
	    "LRD": 158.000217,
	    "LSL": 13.89,
	    "LYD": 1.39,
	    "MAD": 9.494964,
	    "MDL": 17.050396,
	    "MGA": 3584.669847,
	    "MKD": 53.605932,
	    "MMK": 1526.398412,
	    "MNT": 2453.75,
	    "MOP": 8.0755,
	    "MRO": 357,
	    "MRU": 36.45,
	    "MUR": 34.1255,
	    "MVR": 15.459996,
	    "MWK": 727.948631,
	    "MXN": 19.142187,
	    "MYR": 4.094503,
	    "MZN": 61.450531,
	    "NAD": 13.91,
	    "NGN": 365,
	    "NIO": 32.51,
	    "NOK": 8.532073,
	    "NPR": 112.703347,
	    "NZD": 1.463596,
	    "OMR": 0.385007,
	    "PAB": 1,
	    "PEN": 3.338504,
	    "PGK": 3.361,
	    "PHP": 52.19343,
	    "PKR": 139.875,
	    "PLN": 3.74365,
	    "PYG": 6021.471318,
	    "QAR": 3.640999,
	    "RON": 4.084803,
	    "RSD": 103.314719,
	    "RUB": 66.8792,
	    "RWF": 894.294141,
	    "SAR": 3.7515,
	    "SBD": 8.06559,
	    "SCR": 13.646544,
	    "SDG": 47.55,
	    "SEK": 8.93381,
	    "SGD": 1.353156,
	    "SHP": 0.778491,
	    "SLL": 8390,
	    "SOS": 585,
	    "SRD": 7.458,
	    "SSP": 130.2634,
	    "STD": 21050.59961,
	    "STN": 21.6,
	    "SVC": 8.749615,
	    "SYP": 515.016773,
	    "SZL": 13.814999,
	    "THB": 31.9365,
	    "TJS": 9.433858,
	    "TMT": 3.50998,
	    "TND": 2.957028,
	    "TOP": 2.258172,
	    "TRY": 5.466095,
	    "TTD": 6.77125,
	    "TWD": 30.795,
	    "TZS": 2302.3,
	    "UAH": 28.276,
	    "UGX": 3709.688913,
	    "USD": 1,
	    "UYU": 32.77838,
	    "UZS": 8342,
	    "VEF": 248487.642241,
	    "VES": 794.471585,
	    "VND": 23195.5,
	    "VUV": 110.987598,
	    "WST": 2.608273,
	    "XAF": 572.130862,
	    "XAG": 0.0640534,
	    "XAU": 0.00077633,
	    "XCD": 2.70255,
	    "XDR": 0.714554,
	    "XOF": 572.130862,
	    "XPD": 0.00075703,
	    "XPF": 104.082085,
	    "XPT": 0.00123154,
	    "YER": 250.399354,
	    "ZAR": 13.845493,
	    "ZMW": 11.924,
	    "ZWL": 322.355011
	  }

	};*/
	  if(this._latestRates!=null){
	    var input=i;
	    var output=o;
	    var base=this._latestRates["base"];
	    console.log("base: "+base);
	    console.log("input money: "+input);
	    console.log("output money: "+output);
	    console.log("textInput: "+text);
	    if(text){
			  if(base===input){
			    var converValue=this._latestRates["rates"][output];
			    if(converValue){
			      var result=parseFloat(text)*converValue;
			  	  var roundedResult=Math.round(result*1000)/1000;
			      console.log("result idem base :"+roundedResult);
			      if(isNaN(roundedResult)){
			      	return "Check de input."
			      }else if(roundedResult<0){
			      	return "Check de input."	
			      }				
			      else{
			      	return roundedResult;
			      }
			    
			    }
			  }else{
			      var result=parseFloat(text)*(1/this._latestRates["rates"][input]);
			      var roundedResult=Math.round(result*1000)/1000;
    		      console.log("result distint base :"+roundedResult);
			       if(isNaN(roundedResult)){
			      	return "Check de input."
			      }else if(roundedResult<0){
			      	return "Check de input."	
			      }				
			      else{
			      	return roundedResult;
			      }
			  }
	  
		}else{
			return "Input a number!"
		}

	}
	}
}

