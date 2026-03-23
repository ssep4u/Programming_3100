let count = 0;

// HTML -> JS
// const resultH1 = document.getElementsByTagName("h1")[0];
const resultH1 = document.getElementById("result");
// const resultH1 = document.querySelector("#result");
// const plusButton = document.getElementsByTagName("button")[0];

// button 누르면 숫자 증가하자
// plusButton.addEventListener("click", () => {
//     count++;    //count+=1; //count = count + 1;
//     resultH1.innerHTML = count; // 증가한 숫자 화면에 표시하자
// });
// plusButton.onclick = () => {
//     count++;    //count+=1; //count = count + 1;
//     resultH1.innerHTML = count; // 증가한 숫자 화면에 표시하자
// };
function plus(number = 1) {
    count += number;
    resultH1.innerHTML = count;
}
// const plus = (number = 1) => {
//     count += number;
//     resultH1.innerHTML = count;
// }
resultH1.innerHTML = count;