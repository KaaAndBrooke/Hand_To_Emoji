Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});
Webcam.attach('#camera');

function takePic() {
    Webcam.snap(function (snap) {
        document.getElementById("result").innerHTML = '<img id="pic" src="' + snap + '">';
    })
}
console.log("ml5 version is:", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/WirB6N8rq/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model loaded successfully");
}
var prediction1 = "";
var prediction2 = "";

function speak() {
    s = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction1 + ".";
    speak_data2 = "The second prediction is " + prediction2 + ".";
    var utterance = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    s.speak(utterance);
}
function check() {
    img = document.getElementById("pic");
    classifier.classify(img, getResult);
}
function getResult(error, resultArray) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(resultArray);
        prediction1=resultArray[0].label;
        prediction2=resultArray[1].label;
        document.getElementById("emotion1").innerHTML=prediction1;
        document.getElementById("emotion2").innerHTML=prediction2;
        if (prediction1=="OK") {
            document.getElementById("emoji1").innerHTML="&#128076";
        }
        if (prediction1=="Point") {
            document.getElementById("emoji1").innerHTML="&#128070";
        }
        if (prediction1=="Thumbs Up") {
            document.getElementById("emoji1").innerHTML="&#128077";
        }
        if (prediction1=="Stop") {
            document.getElementById("emoji1").innerHTML="&#9995";
        }
        //Line break//
        if (prediction2=="OK") {
            document.getElementById("emoji2").innerHTML="&#128076";
        }
        if (prediction2=="Point") {
            document.getElementById("emoji2").innerHTML="&#128070";
        }
        if (prediction2=="Thumbs Up") {
            document.getElementById("emoji2").innerHTML="&#128077";
        }
        if (prediction2=="Stop") {
            document.getElementById("emoji2").innerHTML="&#9995";
        }
        speak();
    }
}