const newUserSignup = function(fullName, email, phone, password1, password2) {

    //let getFull = document.getElementById("fullName");
    //let nameSplit = getFull.split(' ');

    let getFirst = document.getElementById("first");
    let getLast = document.getElementById("last");
    let getEmail = document.getElementById("email");
    let getPhone = document.getElementById("phone");
  //  let getDob = document.getElementById("dob").value;
    let getPass1 = document.getElementById("password1");
    let getPass2 = document.getElementById("password2");
    //let getTac = document.getElementsByName("tac");

/*  if ((!getTac[0].checked) || (getFirst === "") || (getLast === "") || (getEmail === "") || (getPhone === "") || (getDob === "") || (getPass1 === "") || (getPass2 === "")) {
   
    }
    else if (validate fields) {}
    else {
    console.log("all is well");
    */
    
    //console.log("first: ", getFirst);
    //console.log("last: ", getLast);
   // console.log("email: ", getEmail);
    //console.log("phone: ", getPhone);
   // console.log("dob: ", getDob);
   // console.log("pw1: ", getPass1);
    //console.log("pw2: ", getPass2);
    
    
    //let hashed = hashPW(getPass1);

    /*
    let url = `/addUser?first=${getFirst}&last=${getLast}&email=${getEmail}&phone=${getPhone}&dob=${getDob}&password=${hashed}`;
    fetch(url).then(response => response.json()).then(body => {
        console.log("Success");
    });
    */

    function hashPW(str) {
        //console.log("fill in hash function body");
        return str;
    }

    function validPW(str1, str2) {
        //compare for equality
        //compare for validity
        //return array of a boolean and a string message
    }
}

export default newUserSignup();