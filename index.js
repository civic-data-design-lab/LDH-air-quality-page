
// CODE FOR PAGE NAVIGATION ARROWS

function init() {
	localStorage.setItem('page_num', 1);
	updatePageDisplay(1);
}

function updatePageDisplay(page_num) {
	const cards = ['today', 'graph', 'info']
	cards.forEach(element => document.getElementById(element).style.display="none")
	switch (page_num) {
		case 1:
			document.getElementById(cards[0]).style.display="initial";
			break;
		case 2:
			document.getElementById(cards[1]).style.display="initial";
			break;
		case 3:
			document.getElementById(cards[2]).style.display="initial";
			break;
	}
}

function rightClick() {
	var page_num = localStorage.getItem('page_num');
	page_num = Math.min(+page_num + 1, 3);
	localStorage.setItem('page_num', page_num);
	updatePageDisplay(page_num);
}

function leftClick() {
	var page_num = localStorage.getItem('page_num');
	page_num = Math.max(+page_num - 1, 1);
	localStorage.setItem('page_num', page_num);
	updatePageDisplay(page_num);
}


// CODE FOR CALCULATING AQI AND RELATED MESSAGING

			function aqiFromPM(pm) {

			      if (isNaN(pm)) return "-"; 
			      if (pm == undefined) return "-";
			      if (pm < 0) return pm; 
			      if (pm > 1000) return "-"; 
			        /*      
			              Good                              0 - 50         0.0 - 15.0         0.0 – 12.0
			        Moderate                        51 - 100           >15.0 - 40        12.1 – 35.4
			        Unhealthy for Sensitive Groups   101 – 150     >40 – 65          35.5 – 55.4
			        Unhealthy                                 151 – 200         > 65 – 150       55.5 – 150.4
			        Very Unhealthy                    201 – 300 > 150 – 250     150.5 – 250.4
			        Hazardous                                 301 – 400         > 250 – 350     250.5 – 350.4
			        Hazardous                                 401 – 500         > 350 – 500     350.5 – 500
			        */
			        if (pm > 350.5) {
			          return calcAQI(pm, 500, 401, 500, 350.5);
			        } else if (pm > 250.5) {
			          return calcAQI(pm, 400, 301, 350.4, 250.5);
			        } else if (pm > 150.5) {
			          return calcAQI(pm, 300, 201, 250.4, 150.5);
			        } else if (pm > 55.5) {
			          return calcAQI(pm, 200, 151, 150.4, 55.5);
			        } else if (pm > 35.5) {
			          return calcAQI(pm, 150, 101, 55.4, 35.5);
			        } else if (pm > 12.1) {
			          return calcAQI(pm, 100, 51, 35.4, 12.1);
			        } else if (pm >= 0) {
			          return calcAQI(pm, 50, 0, 12, 0);
			        } else {
			          return undefined;
			        }
			      
			      }
			      function bplFromPM(pm) {
			      if (isNaN(pm)) return 0; 
			      if (pm == undefined) return 0;
			      if (pm < 0) return 0; 
			        /*      
			              Good                              0 - 50         0.0 - 15.0         0.0 – 12.0
			        Moderate                        51 - 100           >15.0 - 40        12.1 – 35.4
			        Unhealthy for Sensitive Groups   101 – 150     >40 – 65          35.5 – 55.4
			        Unhealthy                                 151 – 200         > 65 – 150       55.5 – 150.4
			        Very Unhealthy                    201 – 300 > 150 – 250     150.5 – 250.4
			        Hazardous                                 301 – 400         > 250 – 350     250.5 – 350.4
			        Hazardous                                 401 – 500         > 350 – 500     350.5 – 500
			        */
			        if (pm > 350.5) {
			        return 401;
			        } else if (pm > 250.5) {
			        return 301;
			        } else if (pm > 150.5) {
			        return 201;
			        } else if (pm > 55.5) {
			        return 151;
			        } else if (pm > 35.5) {
			        return 101;
			        } else if (pm > 12.1) {
			        return 51;
			        } else if (pm >= 0) {
			        return 0;
			        } else {
			        return 0;
			        }
			      
			      }
			      function bphFromPM(pm) {
			      //return 0;
			      if (isNaN(pm)) return 0; 
			      if (pm == undefined) return 0;
			      if (pm < 0) return 0; 
			        /*      
			              Good                              0 - 50         0.0 - 15.0         0.0 – 12.0
			        Moderate                        51 - 100           >15.0 - 40        12.1 – 35.4
			        Unhealthy for Sensitive Groups   101 – 150     >40 – 65          35.5 – 55.4
			        Unhealthy                                 151 – 200         > 65 – 150       55.5 – 150.4
			        Very Unhealthy                    201 – 300 > 150 – 250     150.5 – 250.4
			        Hazardous                                 301 – 400         > 250 – 350     250.5 – 350.4
			        Hazardous                                 401 – 500         > 350 – 500     350.5 – 500
			        */
			        if (pm > 350.5) {
			        return 500;
			        } else if (pm > 250.5) {
			        return 500;
			        } else if (pm > 150.5) {
			        return 300;
			        } else if (pm > 55.5) {
			        return 200;
			        } else if (pm > 35.5) {
			        return 150;
			        } else if (pm > 12.1) {
			        return 100;
			        } else if (pm >= 0) {
			        return 50;
			        } else {
			        return 0;
			        }
			      
			      }
			 
			      function calcAQI(Cp, Ih, Il, BPh, BPl) {
			      
			        var a = (Ih - Il);
			        var b = (BPh - BPl);
			        var c = (Cp - BPl);
			        return Math.round((a/b) * c + Il);
			      
			      }
			 
			 
			      function getAQIDescription(aqi) {
			        if (aqi >= 401) {
			          return 'Hazardous';
			        } else if (aqi >= 301) {
			          return 'Hazardous';
			        } else if (aqi >= 201) {
			          return 'Very Unhealthy';
			        } else if (aqi >= 151) {
			          return 'Unhealthy';
			        } else if (aqi >= 101) {
			          return 'Unhealthy for Sensitive Groups';
			        } else if (aqi >= 51) {
			          return 'Moderate';
			        } else if (aqi >= 0) {
			          return 'Good';
			        } else {
			          return undefined;
			        }
			      }
			 
			      function getAQIMessage(aqi) {
			        if (aqi >= 401) {
			          return 'Health alert: everyone may experience more serious health effects';
			        } else if (aqi >= 301) {
			          return 'Health alert: everyone may experience more serious health effects';
			        } else if (aqi >= 201) {
			          return 'Health warnings of emergency conditions. The entire population is more likely to be affected. ';
			        } else if (aqi >= 151) {
			          return 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
			        } else if (aqi >= 101) {
			          return 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
			        } else if (aqi >= 51) {
			          return 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
			        } else if (aqi >= 0) {
			          return 'Air quality is considered satisfactory, and air pollution poses little or no risk';
			        } else {
			          return undefined;
			        }
			     }

			     function getAQIOpacity(aqi) {
			     	if (aqi >= 401) {
			     	  return 0.95;
			     	} else if (aqi >= 301) {
			     	  return 0.8;
			     	} else if (aqi >= 201) {
			     	  return 0.7;
			     	} else if (aqi >= 151) {
			     	  return 0.6;
			     	} else if (aqi >= 101) {
			     	  return 0.5;
			     	} else if (aqi >= 51) {
			     	  return 0.3;
			     	} else if (aqi >= 0) {
			     	  return 0;
			     	} else {
			     	  return undefined;
			     	}
			     }


// CODE FOR GOOGLE MAPPING
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
  console.log("init map fired");
}