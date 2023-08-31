const newAuctionSignup = function() {
    console.log("get user id of user currently posting through their email or phone number");
    let gethost = "tempHost";
    let hostPhone = document.getElementById("phoneNumber").value;
    let hostEmail = document.getElementById("email").value;

    console.log("generate auction id based on number of rows in auction table");
    let getauctionID = "007";
    let getminBid = document.getElementById("minimumBid").value;
    let getprodName = document.getElementById("title").value;
    let getprodDesc = document.getElementById("description").value;
    let getauctType = document.getElementById("first").value;
    let getDate = document.getElementById("auctionDate").value;
    let getstart =  document.getElementById("startTime").value;
    //combine date and times
    let getend = document.getElementById("endTime").value;
    let gettimePeriod = document.getElementById("timePeriod").value;
    let getactive = true; //update to check current time vs start time
    let getimage = null; //update to add the images
    
    console.log("host: ", gethost);
    console.log("last: ", getauctionID);
    console.log("email: ", getminBid);
    console.log("phone: ", getprodName);
    console.log("dob: ", getprodDesc);
    console.log("pw1: ", getauctType);
    console.log("pw2: ", getDate);
    console.log("pw2: ", getstart);
    console.log("pw2: ", getend);
    console.log("pw2: ", gettimePeriod); 
    //console.log("pw2: ", getactive);

/*
    let url = `/addAuction?host=${gethost}&auctionid=${getauctionID}&minBid=${getminBid}&prodName=${getprodName}&prodDesc=${getprodDesc}&auctType=${getauctType}&start=${getstart}&end=${getend}&timePeriod=${gettimePeriod}&active=${getactive}&image=${getimage}`;
    fetch(url).then(response => response.json()).then(body => {
        console.log("success");
    });
    */

}

export default newAuctionSignup();