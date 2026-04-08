const CrowdFundingAddress = "0xe775bedd8bb235d02c0787799b0ca8743c985891";
const CrowdFundingABI = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_campaignId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_targetAmt",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_deadline",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_r_walletAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_camptype",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_paymentType",
				"type": "string"
			}
		],
		"name": "registerNewCampaign",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_txnId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_txnAmt",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_senderId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_s_walletAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_campaignId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_rewardId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tokens",
				"type": "string"
			}
		],
		"name": "registerNewTxn",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "CampaignCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "CampaignList",
		"outputs": [
			{
				"internalType": "string",
				"name": "campaignId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "targetAmt",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "deadline",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "r_walletAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "camptype",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "paymentType",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "txnCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "TxnList",
		"outputs": [
			{
				"internalType": "string",
				"name": "txnId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "txnAmt",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "senderId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "s_walletAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "campaignId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "rewardId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "txn_tokens",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
let CrowdFunding;
let signer;

const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");

provider.send("eth_requestAccounts", []).then(() => {
	provider.listAccounts().then((accounts) => {
		signer = provider.getSigner(accounts[0]);
		CrowdFunding = new ethers.Contract(
			CrowdFundingAddress,
			CrowdFundingABI,
			signer
		);
	});
});

//   async function getTxn() {
//     const getTxn = CrowdFunding.txnCount();
//     const txn = await getTxn;
//     getTxnList(txn);
//     // console.log(parseInt(txn));
//   }

//   async function getTxnList(txn) {
//     const getTxnList = CrowdFunding.TxnList(1);
//     const TxnList = []
//     TxnList.push(await getTxnList)
//     // await getTxnList;
//     var meh = TxnList[0]
//     console.log(meh[0], parseInt(txn));
//   }

async function MetaMaskAcct() {
	const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
		.catch((e) => {
			console.error(e.message)
			return
		})
	if (!accounts) { return }

	window.userWalletAddress = accounts[0]
	// console.log(window.userWalletAddress);
	return (window.userWalletAddress);
}

let userWallet;
const promise = MetaMaskAcct();

const m = Promise.resolve(promise);
m.then(value => {
	userWallet = value;
	// console.log(userWallet);
}).catch(error => {
	console.log(error);
})


async function createTxn(txn) {
	const dets = txn.txnId + txn.txnAmt + txn.userId + userWallet + txn.prjId + txn.rewardId
	var tokenHash = generateHash(dets).then(data => {
		return data
	})
	const setTxn = CrowdFunding.registerNewTxn(txn.txnId, txn.txnAmt.toString(), txn.userId, userWallet, txn.prjId, txn.rewardId, tokenHash);
	var hash = await setTxn.then(result => {
		return result.hash
	});
	var check = await checkTransaction(hash).then(r => {
		// alert(r);
		return (r);
	})
	var txnCheck = await transferEth(userWallet, txn.txnAmt).then(result => {
		return (result)
	})
	if (check == "Confirmed" && txnCheck == "Confirmed") {
		return ("check");
	}
	else {
		return ("Failed")
	}
}

async function createCampaign(prj) {
	// console.log(prj.title)
	const setCampign = CrowdFunding.registerNewCampaign(prj.prjId, prj.target.toString(), prj.endDate, userWallet, prj.prjType, prj.fundingType);
	var hash = await setCampign.then(result => {
		return result.hash
	});
	// console.log(hash)
	var check = await checkTransaction(hash).then(r => {
		alert(r);
		return (r);
	})
	return check;
}

async function checkTransaction(txnHash) {
	let checkTransactionLoop = () => {
		return ethereum.request({ method: 'eth_getTransactionReceipt', params: [txnHash] }).then(r => {
			if (r != null) return 'Confirmed';
			else return checkTransactionLoop();
		});
	};

	return checkTransactionLoop();
}

async function transferEth(senderWallet, txnAmt) {
	var weiValue = txnAmt * (10 ** 18);
	var ethValue = weiValue.toString(16);

	let transactionParams = {
		to: '0xd7EBd7700688ac0813599D01AEC0065825611d37', //Crowdfueled.org
		from: senderWallet,
		value: ethValue               //0.0001 eth eth-wei-hexademial
	};

	const txnHash = window.ethereum.request({ method: 'eth_sendTransaction', params: [transactionParams] }).then(txnHash => {
		console.log(txnHash);
		this.checkTransaction(txnHash).then(r => alert(r));
	});
}


function generateHash(str, algorithm = "SHA-512") {

	// Create an array buffer for the supplied string - this buffer contains an integer representation of the string which can be used to generate the hash
	let strBuffer = new TextEncoder().encode(str);

	// use SubtleCrypto to generate the hash using the specified algorithm
	return crypto.subtle.digest(algorithm, strBuffer)
		.then(hash => {

			// The resulting hash is an arrayBuffer, and should be converted to its hexadecimal representation
			// Initialize the result as an empty string - the hexadecimal characters for the values in the array buffer will be appended to it
			let result = '';
			// The DataView view provides an interface for reading number types from the ArrayBuffer
			const view = new DataView(hash);
			// Iterate over each value in the arrayBuffer and append the converted hexadecimal value to the result
			for (let i = 0; i < hash.byteLength; i += 4) {
				result += ('00000000' + view.getUint32(i).toString(16)).slice(-4);
			}
			return result;
		});

}