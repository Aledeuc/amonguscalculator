window.onload = function () {
    var localStorageArray = ["iLost", "cLost", "iWin", "cWin"];
    localStorageArray.forEach((item) => setResult(item));
  };
  
  var setResult = (id) => {
    var currentResult = getResult(id);
  
    if (currentResult == null || currentResult == "NaN") {
      return setInitialResult(id);
    }
  
    setHtmlInput(id, currentResult);
    triggerFinalResults();
  };
  
  const setNewResult = (id, operator) => {
    var currentResult = getResult(id);
  
    if (operator == "plus") {
      var newResult = Number(currentResult) + 1;
    } else {
      if (currentResult <= 0) {
        return;
      }
      var newResult = Number(currentResult) - 1;
    }
  
    setHtmlInput(id, newResult);
  
    localStorage.setItem(id, newResult);
    triggerFinalResults();
  };
  
  const setHtmlInput = (id, result) => {
    var htmlInput = document.getElementById(id);
  
    htmlInput.innerHTML = result;
  };
  
  const getResult = (id) => {
    return localStorage.getItem(id);
  };
  
  
  const setInitialResult = (id) => {
    localStorage.setItem(id, 0);
    document.getElementById(id).innerHTML = "0";
  };
  
  
  const triggerFinalResults = () => {
    var localStorageArray = ["percIWin", "percCWin", "chanceImp", "chanceCrew"];
  
    localStorageArray.forEach((item) => {
      var result = getResult(item);
  
      if (item == "percIWin") {
        result = percentageImposterWin();
      } else if (item == "percCWin") {
        result = percentageCrewmateWin();
      } else if (item == "chanceImp") {
        result = chanceOnImposter();
      } else if (item == "chanceCrew") {
        result = chanceOnCrewmate();
      }
      console.log('result', result)
      if (
        Number.isNaN(Number(result)) ||
        !Number.isFinite(Number(result)) ||
        Number(result) > 100
      ) {
        result = "???";
      } else {
        result = result + "%";
      }
      console.log('result2', result)
  
      setHtmlInput(item, result);
    });
  };
  
  var percentageImposterWin = () => {
    var impWin = localStorage.getItem("iWin");
    var impLost = localStorage.getItem("iLost");
  
    var percImpWin = (Number(impWin) / (Number(impWin) + Number(impLost))) * 100;
    percImpWin = percImpWin.toFixed(2);
  
    return percImpWin;
  };
  
  var percentageCrewmateWin = () => {
    var crewWin = localStorage.getItem("cWin");
    var crewLost = localStorage.getItem("cLost");
  
    var percCrewWin =
      (Number(crewWin) / (Number(crewWin) + Number(crewLost))) * 100;
  
    percCrewWin = percCrewWin.toFixed(2);
  
    return percCrewWin;
  };
  
  var chanceOnImposter = () => {
    var impSum = impostorSum();
    var crewSum = crewmateSum();
  
    var chanceImpostor = Number(impSum) / (Number(impSum) + Number(crewSum)) * 100;
    chanceImpostor = chanceImpostor.toFixed(2)
    
    return chanceImpostor;
  };
  
  var chanceOnCrewmate = () => {
    var impSum = impostorSum();
    var crewSum = crewmateSum();
  
    var chanceCrewmate = Number(crewSum) / (Number(impSum) + Number(crewSum)) * 100;
    chanceCrewmate = chanceCrewmate.toFixed(2)
  
    return chanceCrewmate;
  };
  
  var impostorSum = () => {
    var impWin = localStorage.getItem("iWin");
    var impLost = localStorage.getItem("iLost");
    return Number(impWin) + Number(impLost);
  };
  
  var crewmateSum = () => {
    var crewWin = localStorage.getItem("cWin");
    var crewLost = localStorage.getItem("cLost");
    return Number(crewWin) + Number(crewLost);
  };
  
  var setDisplay = (id) => {
    var display = document.getElementById(id);
    display.classList.toggle("display-off");
  };
  
  var resetLocalStorage = () => {
    localStorage.clear();
  
    var localStorageArray = ["iLost", "cLost", "iWin", "cWin"];
    localStorageArray.forEach((item) => setResult(item));
  
    triggerFinalResults();
  };
  