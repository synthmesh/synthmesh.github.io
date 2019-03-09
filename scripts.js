// SynthMesh scripts

    var tabledata;
    var tabledataS;
    
    var page = "home"
    
    function load() {
     var linkC = "https://us-central1-absolute-pulsar-232300.cloudfunctions.net/selectCompanies"
     var linkS = "https://us-central1-absolute-pulsar-232300.cloudfunctions.net/selectSynth"
     
       var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      tabledata = JSON.parse(this.response);
     
    }
  };
        xhttp.open("GET", linkC, true);
        xhttp.send();
        
     var xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      tabledataS = JSON.parse(this.response);
    }
  };
        xhttp2.open("GET", linkS, true);
        xhttp2.send();
        
        goHome();
  }

  function buildHtmlTable(myList, selector) {
  var columns = addAllColumnHeaders(myList, selector);
  for (var i = 0; i < myList.length; i++) {
    var row$ = $('<tr/>');
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = myList[i][columns[colIndex]];
      if (cellValue == null) cellValue = "";
      row$.append($('<td/>').html(cellValue));
    }
    $(selector).append(row$);
  }
  }

  // Adds a header row to the table and returns the set of columns.
  // Need to do union of keys from all records as some records may not contain
  // all records.
  function addAllColumnHeaders(myList, selector) {
  var columnSet = [];
  var headerTr$ = $('<tr/>');
  for (var i = 0; i < myList.length; i++) {
    var rowHash = myList[i];
    for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
        columnSet.push(key);
        headerTr$.append($('<th/>').html(key));
      }
    }
  }
  $(selector).append(headerTr$);

  return columnSet;
  }
  

  function browse(page){
  	this.page = page
  }
  
  function goHome(){
  	browse("home");
  	var content = "<h3>Midi enabled Web Synthesizer</h3><span class=button onclick=startSynth()>Enable Synthesizer</span><span class=button onclick=stopSynth()>Disable Synthesizer</span><span id='synth'><tone-content><tone-piano></tone-piano><tone-synth></tone-synth></tone-content></span>";
  	$('#content').html(content );
  }
  
  function goCompanies(){
   $('#content').html("<h3>Companies</h3>");
   
   stopSynth();
   buildHtmlTable(tabledata, '#content');
  	browse("companies");
  }
  
  function goWebSynth(){
  stopSynth();
  	$('#content').html("<h3>Web Based Synthesizer</h3>");
  	buildHtmlTable(tabledataS, '#content');
  	browse("webSynth");
  }

  function goSoftSynth(){
  stopSynth();
  	var content = "<h3>Software Synth</h3>";
  	$('#content').html(content);
  	browse("softSynth");
  }
  
  function goHardSynth(){
  stopSynth();
    var content = "<h3>Hardware Synth</h3>";
  	$('#content').html(content);
  	browse("hardSynth");
  }
  
  function goModSynthHard(){
  stopSynth();
  	var content = "<h3>Modular Synth Hardware</h3>";
  	$('#content').html(content);
  	browse("modSynthHard");
  }

  function goModSynthSoft(){
  stopSynth();
  var content = "<h3>Modular Synth Software</h3>";
  	$('#content').html(content);
  	browse("modSynthSoft");
  }
  
 function goVJ(){
 stopSynth();
    var content = "<h3>VJ Software</h3>";
  	$('#content').html(content);
  	browse("vjSoft");
  }
  	
  function goTheory(){
  stopSynth();
  	var content = "<h3>Theory</h3>";
  	$('#content').html(content);
  	browse("theory");
  }
  
  function goAbout(){
  stopSynth();
  	var content = "<h3>About</h3>";
  	$('#content').html(content);
  	browse("about");
  }
  
  function goResources(){
    stopSynth();
    var p = loadFile("resources.html")
  	var content = "<h3>Resources</h3>" + p;
  	$('#content').html(content);
  	browse("resources");
  }
  
  function loadFile(filePath) {
	  var result = null;
	  var xmlhttp = new XMLHttpRequest();
	  xmlhttp.open("GET", filePath, false);
	  xmlhttp.send();
	  if (xmlhttp.status==200) {
		result = xmlhttp.responseText;
	  }
  return result;
}