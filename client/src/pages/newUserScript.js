
//var butt = document.getElementById("submit");
//butt.addEventListener("click", toData);

const newUserSignup = function() {

    //function toData(a, b, c, d, e, f, ) {
        //let respMessage = document.getElementById("message");
        //respMessage.textContent = ("");
        let getFull = document.getElementById("Full Name").value;
        let nameSplit = getFull.split(" ");

        let getFirst = nameSplit[0];
        let getLast = nameSplit[1];
        let getEmail = document.getElementById("Email").value;
        let getPhone = document.getElementById("Phone Number").value;
        let getDob = document.getElementById("dob").value;
        let getPass1 = document.getElementById("password1").value;
        let getPass2 = document.getElementById("password2").value;
        let getTac = document.getElementsByName("tac");

/*    if ((!getTac[0].checked) || (getFirst === "") || (getLast === "") || (getEmail === "") || (getPhone === "") || (getDob === "") || (getPass1 === "") || (getPass2 === "")) {
        console.log("Fill in all fields please");
        respMessage.textContent = ("Fill in all fields please");
        respMessage.style.color = "red";
    }
    //else if (validate fields) {}
    else {
        console.log("all is well");
        respMessage.textContent = ("all is well");
        respMessage.style.color = "black";
    
        //console.log("first: ", getFirst);
        //console.log("last: ", getLast);
        //console.log("email: ", getEmail);
        //console.log("phone: ", getPhone);
        //console.log("dob: ", getDob);
        //console.log("pw1: ", getPass1);
        //console.log("pw2: ", getPass2);
        */
        
            let hashed = hashPW(getPass1);

            let url = `/addUser?first=${getFirst}&last=${getLast}&email=${getEmail}&phone=${getPhone}&dob=${getDob}&password=${hashed}`;
            fetch(url).then(response => response.json()).then(body => {
            
        //    respMessage.textContent = ("Success");
        
            });

    function hashPW(str) {
        console.log("fill in function body");
        return str;
    }

    function validPW(str1, str2) {
        //compare for equality
        //compare for validity
        //return array of a boolean and a string message
    }
}


export default newUserSignup();