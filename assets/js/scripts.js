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
  
  var isWeb = true;
  var isSoft = true;
  var isHard = true;
  var isModular = true;
  

  function browse(page){
  	this.page = page
  }
  
  function goHome(){
  	browse("home");
  	var content = "<span class=button onclick=startSynth()>Enable Synthesizer</span><span class=button onclick=stopSynth()>Disable Synthesizer</span><span id='synth'><tone-content><tone-piano></tone-piano><tone-synth></tone-synth></tone-content></span>";
  	$('#contentHeader').html("<h3>Midi enabled Web Synthesizer</h3>" );
  	$('#content').html(content );
  }
  
  function goCompanies(){
  	stopSynth();
    $('#contentHeader').html("<h3>Companies</h3>");
    $('#content').html("");
    buildHtmlTable(tabledata, '#content');
  	browse("companies");
  }
  
var header = "<h3>Synthesizer &nbsp;&nbsp;"
  	header += "<input type='checkbox' onclick='handleClick(this);' name='cbxHardware'  checked> hardware&nbsp;&nbsp;&nbsp;"
  	header += "<input type='checkbox' onclick='handleClick(this);' name='cbxSoftware' checked> software&nbsp;&nbsp;&nbsp;"
  	header += "<input type='checkbox' onclick='handleClick(this);' name='cbxWeb'  checked> web&nbsp;&nbsp;&nbsp;"
  	header += "<input type='checkbox' onclick='handleClick(this);' name='cbxModular' checked> modular&nbsp;&nbsp;&nbsp;</h3>"
  	
function handleClick(cb) {
	if(cb.name == "cbxHardware"){
	    isHard = cb.checked;
	}
	if(cb.name == "cbxSoftware"){
	    isSoft = cb.checked;
	}
	if(cb.name =="cbxWeb"){
	    isWeb = cb.checked;
	}
	if(cb.name=="cbxModular"){
	    isModular = cb.checked;
	}
	
	var items = [];
	
	for (var i = 0; i < tabledataS.length; i++) {
	
		if(isWeb && tabledataS[i].web == true){
			   items.push(tabledataS[i]);
		}
		if(isSoft && tabledataS[i].soft == true ){
			   items.push(tabledataS[i]);
		}
		if(isHard && tabledataS[i].hard == true){
			   items.push(tabledataS[i]);
		}
		if(isModular && tabledataS[i].modular == true){
			   items.push(tabledataS[i]);
		}
    }
	
  	$('#content').html("");
  	buildHtmlTable(items, '#content');
  	browse("webSynth");
}

  function goWebSynth(){
  	stopSynth();
  	$('#contentHeader').html(header)
  	$('#content').html("")
  	buildHtmlTable(tabledataS, '#content');
  	browse("webSynth");
  }

  function goSoftSynth(){
  stopSynth();
  	var content = "<h3>Software Synth</h3>";
  	$('#contentHeader').html(content);
  	$('#content').html("" );
  	browse("softSynth");
  }
  
  function goHardSynth(){
  stopSynth();
    var content = "<h3>Hardware Synth</h3>";
  	$('#contentHeader').html(content);
  	$('#content').html("" );
  	browse("hardSynth");
  }
  
  function goModSynthHard(){
  stopSynth();
  	var content = "<h3>Modular Synth Hardware</h3>";
  	$('#contentHeader').html(content);
  	$('#content').html("" );
  	browse("modSynthHard");
  }

  function goModSynthSoft(){
  stopSynth();
  var content = "<h3>Modular Synth Software</h3>";
  	$('#contentHeader').html(content);
  	$('#content').html("" );
  	browse("modSynthSoft");
  }
  
 function goVJ(){
 stopSynth();
    var content = "<h3>VJ Software</h3>";
  	$('#contentHeader').html(content);
  	$('#content').html("<a href='https://vidvox.net/'>VDMX</a><br/><a href='http://www.renewedvision.com/pvp.php'>ProVideoPlayer 2</a><br/><a href='http://resolume.com/'>Resolume</a><br/><a href='http://www.madmapper.com'>MadMapper</a><br/><a href='http://www.modul8.ch'>Modul8</a><br/><br/><br/>&nbsp;" );
  	browse("vjSoft");
  }
  	
  function goTheory(){
  stopSynth();
   var p = loadFile("add0.html")
  	var content = "<h3>Theory</h3>";
  	$('#contentHeader').html(content);
  	$('#content').html(p );
  	browse("theory");
  }
  
  function goAbout(){
  stopSynth();
  	var content = "<h3>About</h3>";
  	$('#contentHeader').html(content);
  	$('#content').html("All about synthesizer, software or hardware, VST, AU or web-based. Modular or even Web based Modular!<br/><br/><br/><br/>&nbsp;" );
  	browse("about");
  }
  
  function goResources(){
    stopSynth();
    var p = loadFile("resources.html")
  	$('#contentHeader').html("<h3>Resources</h3>");
  	$('#content').html(p);
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