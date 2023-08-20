const { use } = require("./example");

function decideWinner(userBidMap, auctionType) {
    let sortedBids = Object.keys(userBidMap).sort((a, b) => userBidMap[b] - userBidMap[a]);
    const sortedBidsMap = {};

    if (auctionType === 'seal-highest-bid' || auctionType === 'open-asc-bid') {
        sortedBids.forEach((key) => {
            sortedBidsMap[key] = userBidMap[key];
        });
    } 
    else if (auctionType === 'seal-second-highest') {
        for (let i=0; i < sortedBids.length; i++) {
            if (i+1 >= sortedBids.length) {
                sortedBidsMap[sortedBids[i]] = userBidMap[sortedBids[i]];
            } else {
                sortedBidsMap[sortedBids[i]] = userBidMap[sortedBids[i+1]];
            }
        }
    }

    return sortedBidsMap;
}

