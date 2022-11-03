// Варіант 8
// 1.  копійки в грн (1 грн == 100 копійок)
document.getElementById("ex.1")
a=Number(prompt("a= "));
var quo = Math.floor(a/100);
var rem = a%100;
document.write(quo,'грн ',rem,'коп');




// 2.  золотник в грами(1 золотник ==  4.2657 г.)

function Converter(a) {
    valNum = parseFloat(a);
     document.getElementById("outputValve").innerHTML = (a)*4.2657;
  }




// 3. цикли

function rightTriangle(n) {
  for (var i = 1; i <= n; i++) {
    document.write(i, ' ' );
    for (var j = 1; j <= i; j++) {
         document.write(j, ' ');
    }
    document.write('<br>');
  }
}
document.write('<br>');
rightTriangle(23)



// 4. функція (фото+посилання)

let myImage = document.querySelector('img');

myImage.onclick = function(){
  let img=document.createElement('img');
  img.scr = "uzhnu.png";
  document.body.appendChild(img);
  console.log(img)
}

