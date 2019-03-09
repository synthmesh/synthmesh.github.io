
// Synthesizer homepage

var synth;

function  stopSynth(){
if(synth){
	//synth.disconnect();
	synth.dispose();
	}
}

function  startSynth(){
	synth = new Tone.Synth({
		"oscillator" : {
			"type" : "amtriangle",
			"harmonicity" : 0.5,
			"modulationType" : "sine"
		},
		"envelope" : {
			"attackCurve" : "exponential",
			"attack" : 0.05,
			"decay" : 0.2,
			"sustain" : 0.2,
			"release" : 1.5,
		},
		"portamento" : 0.05
	}).toMaster();
	
	//bind the interface
	document.querySelector("tone-piano").bind(synth);
	document.querySelector("tone-synth").bind(synth);
}
