
var butt = document.getElementById("submit");
butt.addEventListener("click", toData);

function validPW(str1, str2) {
    //compare for equality
    //compare for validity
    //return array of a boolean and a string message
}

function toData(a, b, c, d, e, f, ) {
    let respMessage = document.getElementById("message");
    respMessage.textContent = ("");

    let gethost = document.getElementById("first").value;
    let getauctionID = document.getElementById("first").value;
    let getminBid = document.getElementById("first").value;
    let getprodName = document.getElementById("first").value;
    let getprodDesc = document.getElementById("first").value;
    let getauctType = document.getElementById("first").value;
    let getstart =  document.getElementById("first").value;
    let getend = document.getElementById("first").value;
    let gettimePeriod = document.getElementById("first").value;
    let getactive = document.getElementById("first").value;
    let getimage = document.getElementById("first").value;

   // if ((!getTac[0].checked) || (getFirst === "") || (getLast === "") || (getEmail === "") || (getPhone === "") || (getDob === "") || (getPass1 === "") || (getPass2 === "")) {
   //     console.log("Fill in all fields please");
   //     respMessage.textContent = ("Fill in all fields please");
   //     respMessage.style.color = "red";
   // }

        let url = `/addAuction?host=${gethost}&auctionid=${getauctionID}&minBid=${getminBid}&prodName=${getprodName}&prodDesc=${getprodDesc}&auctType=${getauctType}&start=${getstart}&end=${getend}&timePeriod=${gettimePeriod}&active=${getactive}&image=${getimage}`;
        fetch(url).then(response => response.json()).then(body => {
            
            respMessage.textContent = ("Success");
        
        });
}


export default toData();