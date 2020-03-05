	var UIControlar=(function(){
			//Dom string;
					var ClassNameObjects={
									AmountInputBox:".userinput",
									CountryInputBox:".countrylable",
									TrenslateCountry:".countrylable2",
									answarinput:".userinput2",
									currentUserCountry:".usercountrycode",
									CurrentChangeCountryCodeandAmount:".exchangecountrycode",
									swapeButton:".swapeButton"

					}

						//get amunnt from the user;
					var UsetInputAmount=function(){
						var currentInputAmount=document.querySelector(ClassNameObjects.AmountInputBox).value;
						return currentInputAmount;
					}

					//get countryname from user;
					var UsetInputCountry=function(){						
						var currentInputcountry=document.querySelector(ClassNameObjects.CountryInputBox).value;
						document.querySelector(ClassNameObjects.currentUserCountry).textContent=currentInputcountry;
						return currentInputcountry;
					}
					///get countryname for translate;
					var TraslateInputCountry=function(){						
						var translateinputcountry=document.querySelector(ClassNameObjects.TrenslateCountry).value;
						return translateinputcountry;
					}
					// var Uiswap=function(val1,val2){
					// 	console.log(val1)
					// 	console.log(val2)
					// 	document.querySelector(".countrylable").value=val2;
					// 	document.getElementById("select_tag").value=val1;
					// 	console.log(document.querySelector("#select_tag").value);
					//}

					return{
						getinputamount:function(){
								return UsetInputAmount()
						},
						getInputCountryName:function(){
								return UsetInputCountry();

						},
						ReturnTraslateCountryName:function(){
									return TraslateInputCountry();
						},
						returnClassNames:function(){
								return ClassNameObjects;
						},
						returnswapUi:function(input1,input2){
								console.log(input1,input2);
								document.querySelector(".countrylable").value=input2;
								document.querySelector(".countrylable2").innerText="is";
								
						}



					}
		



		})();
		
		var DataCountrolar=(function(vals){
				var convertnumber,trenslateCountryCode;

				var getData=function(amount,countryname,translatecountry){

							var OfterConvartAnswar,number,UserCountryAmount;

							 	fetch(`https://api.exchangerate-api.com/v4/latest/${countryname}`)
							 	.then(function(res){						 			
							 				return res.json();
							 	})
							 	.then(function(obj){
							 							 			
							 			trenslateCountryCode=translatecountry;						 			
							 			
							 			convertnumber=obj.rates[translatecountry];
							 			//user country;
							 			
							 			UserCountryAmount=obj.rates[countryname];
							 			//user country amount;							 			

							 			number=amount;
							 				//console.log(number)
							 			OfterConvartAnswar=(convertnumber*number);	 			



							 			document.querySelector(vals.returnClassNames().answarinput).value=OfterConvartAnswar.toFixed(6);
							 			document.querySelector(vals.returnClassNames().CurrentChangeCountryCodeandAmount).textContent=`${obj.rates[translatecountry]}${translatecountry}`;						 			
							 			
							 	})
							 	.catch(function(error){
							 		console.log(error);
							 	})

							 	
				 };
				 var RechangeInput=function(amount){
				 		console.log(amount/convertnumber);
				 		document.querySelector(vals.returnClassNames().AmountInputBox).value=Math.round(amount/convertnumber);
				 };

				 return{

				 		getuseramount:function(amount,countryname,translatecpountry){
				 					return getData(amount,countryname,translatecpountry)
				 		},
				 		returnRechanceInput:function(val){
				 					RechangeInput(val);
				 		},
				 		returnCurrentChangeCountryCode:function(){

				 					return trenslateCountryCode;
				 		},
				 		returnCurrentChangeCountryAmount:function(){
				 			return 	convertnumber;
				 		}

				 		

				 }
		})(UIControlar);

		var CommenControlar=(function(uicontrol,datacountrol){	
									
					var Userinput=function(){

							var useramount=uicontrol.getinputamount();
							var usercountryname=uicontrol.getInputCountryName();
							var TrenslateCountry=uicontrol.ReturnTraslateCountryName();								
							 datacountrol.getuseramount(useramount,usercountryname,TrenslateCountry);												 	

					}
					var RechangeInput=function(){
							datacountrol.returnRechanceInput(document.querySelector(uicontrol.returnClassNames().answarinput).value);

					}
					var SwapChanges=function(){

							var useramount=uicontrol.getinputamount();
							var usercountryname=uicontrol.getInputCountryName();
							var TrenslateCountry=uicontrol.ReturnTraslateCountryName();	
							uicontrol.returnswapUi(usercountryname,TrenslateCountry);

						//datacountrol.getuseramount(1,"USD","AED");
					}
				
					

					document.querySelector(uicontrol.returnClassNames().AmountInputBox).addEventListener("input",Userinput);
					document.querySelector(uicontrol.returnClassNames().CountryInputBox).addEventListener("input",Userinput);
					document.querySelector(uicontrol.returnClassNames().TrenslateCountry).addEventListener("input",Userinput);
					document.querySelector(uicontrol.returnClassNames().answarinput).addEventListener("input",RechangeInput);
					document.querySelector(uicontrol.returnClassNames().swapeButton).addEventListener("click",SwapChanges);
					

			return {

					inite:function(){								
							 datacountrol.getuseramount(1,"USD","AED");
					},
					
			}

		})(UIControlar,DataCountrolar);

		CommenControlar.inite();
