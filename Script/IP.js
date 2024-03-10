window.onload = function(){
    let outstr = "";
    console.log = (...args) => {
        for(let arg of args){
            outstr = outstr + arg + "<br>";
        }
        document.getElementById("console").innerHTML = "IP:" + outstr;
    }
fetch('https://ipinfo.io?callback')
  .then(res => res.json())
  .then(json => console.log(json.ip))
}