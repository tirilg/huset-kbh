// url

let urlParams = new URLSearchParams(window.location.search);
let userName = urlParams.get("name");
let userHobby = urlParams.get("hobby");
console.log(userName + " has a hobby, and it's " + userHobby);
