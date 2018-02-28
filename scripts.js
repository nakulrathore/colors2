var colors = [
    {
        0: '#1abc9c',
        1: '#27ae60',
        2: '#3498db',
        3: '#9b59b6'
    }, {
        0: '#f1c40f',
        1: '#e67e22',
        2: '#e74c3c',
        3: '#b71540'
    }, {
        0: '#34495e',
        1: '#2c3e50',
        2: '#95a5a6',
        3: '#7f8c8d'
    }
]



var w = window.innerWidth;
var h = window.innerHeight;
var wx = parseInt((22 / 100) * w);

if(w<h){
    
    var wx = parseInt((60 / 100) * w);
}
var selectedSelector = [];

var div1 = document.createElement("div");
var div2 = document.createElement("div");
var div3 = document.createElement("div");

var divArray = [div1, div2, div3];

colors.forEach((color, i) => {

    let tempDiv;
    tempDiv = document.createElement("div");
    tempDiv.className = "block";
    tempDiv.style.width = wx + 'px';
    tempDiv.style.height = wx + 'px';
    for (let key in color) {
        const tempDiv1 = document.createElement("div");
        tempDiv1.style.width = (wx / 2) + 'px';
        tempDiv1.style.height = (wx / 2) + 'px';
        tempDiv1.style.background = color[key];
        tempDiv1.className = "inline";
        tempDiv1.setAttribute('data-inlineSelector', i + 1);
        tempDiv1.setAttribute('data-color', color[key]);
        tempDiv1.style.position = 'absolute';

        if (key == 0) {
            tempDiv1.style.top = "0";
            tempDiv1.style.left = "0";
        } else if (key == 1) {
            tempDiv1.style.top = "0";
            tempDiv1.style.right = "0";
        } else if (key == 2) {
            tempDiv1.style.bottom = "0";
            tempDiv1.style.left = "0";
        } else if (key == 3) {
            tempDiv1.style.bottom = "0";
            tempDiv1.style.right = "0";
        }
        tempDiv.appendChild(tempDiv1);

    }
    document
        .getElementById("main")
        .appendChild(tempDiv);
});

var disClick = function (e) {
    e.stopPropagation();
    itsId = this.id;

    index = selectedSelector.indexOf(itsId);
    selectedSelector.splice(index, 1);

    var element = document
        .getElementById(itsId)
        .parentElement;
    element.innerHTML = "";

    element.style.width = (wx / 2) + 'px';
    element.style.height = (wx / 2) + 'px';

}

var copyIt = function (e) {
    e.stopPropagation();
    itsText = this.innerHTML;
    thisIs = this;
    // alert(itsText);
    if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(this);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(this);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    if (document.execCommand('copy')){
        thisIs.innerHTML = '✔ Copied';
        setTimeout(function () {
            thisIs.innerHTML = itsText;
        }, 1000);
    }else{
        alert('your browser doesn\'t support copy feature, please copy manually');
    }
}

var allColors = document.getElementsByClassName("inline");
var colorClick = function (e) {
    e.stopPropagation();

    var inlineSelector = this.getAttribute('data-inlineSelector');
    var colorSelector = this.getAttribute('data-color');
    if (selectedSelector.includes(inlineSelector)) {
        return;
    } else {
        selectedSelector.push(inlineSelector);
    }
    var fruitCount = document.querySelectorAll(
        "[data-inlineSelector='" + inlineSelector + "']"
    );

    let tempDiv;
    tempDiv = document.createElement("div");
    tempDiv.className = "cross";
    tempDiv.innerHTML = "X";
    tempDiv.id = inlineSelector;
    tempDiv.style.zIndex = "2";
    tempDiv.addEventListener('click', disClick);

    let tempDiv2;
    tempDiv2 = document.createElement("div");
    tempDiv2.className = "text";
    tempDiv2.innerHTML = colorSelector;
    tempDiv2.style.zIndex = "2";
    tempDiv2.addEventListener('click', copyIt);


    this.appendChild(tempDiv);
    this.appendChild(tempDiv2);
    this.style.position = 'absolute';

    for (var j = 0; j < fruitCount.length; j++) {
        if (fruitCount[j] == this) {
            fruitCount[j].style.height = '100%';
            fruitCount[j].style.width = '100%';
            fruitCount[j].style.zIndex = "1";
        } else {
            fruitCount[j].style.zIndex = "0";

        }
    }

};

for (var i = 0; i < allColors.length; i++) {
    allColors[i].addEventListener('click', colorClick, false);
}

document.addEventListener('click', function (e) {
    if (e.target.className == 'className') {
        alert('lol')
    }
});