import "/Users/ayushpai/pai-bank copy/frontend/src/css/element.css"

import {useState, useEffect} from 'react';
import Papa from "papaparse";


export default function Balance({load, data}){

  

  const [postData, setPostData] = useState(data.data)
  const [upload, setUpload] = useState(false)

  let [finalAmount, setFinalAmount] = useState(0)
  const [error, setError] = useState("");
  const [file, setFile] = useState("")

  const allowedExtensions = ["csv"];

  console.log(postData)

  const handleFileChange = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
        const inputFile = e.target.files[0];

        // Check the file extensions, if it not
        // included in the allowed extensions
        // we show the error
        const fileExtension =
            inputFile?.type.split("/")[1];
        if (
            !allowedExtensions.includes(fileExtension)
        ) {
            setError("Please input a csv file");
            return;
        }

        // If input type is correct set the state
        setFile(inputFile);
    }
};
const handleParse = () => {

    // If user clicks the parse button without
        // a file we show a error
        if (!file) return alert("Enter a valid file");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, {
                header: true,
            });
            const parsedData = csv?.data;
            let newArray = postData.slice()
            newArray.push(...parsedData)
            setPostData(newArray)

            upload ? setUpload(false) : setUpload(true)
        };
        reader.readAsText(file);
};


useEffect(() => {
  let sum = 0;
  console.log("hello")
  let postData2 = postData.slice()
  for(let i = 0; i < postData2.length; i++){
    let str = NaN
    console.log(typeof(postData2[i]["Amount"]))
    if(typeof(postData2[i]["Amount"]) === 'string'){
      str = parseFloat(postData2[i]["Amount"].replace(/,/g, ''));
    } 
    postData2[i]['Amount'] = str ? str : postData2[i]["Amount"]

    sum += postData2[i]['Amount']
  }

  setFinalAmount(sum)
  setPostData(postData2)

}, [upload])






  // for(let i = 0; i < postData.length; i++){
  //   let str = NaN
  //   console.log(typeof(postData[i]["Amount"]))
  //   if(typeof(postData[i]["Amount"]) === 'string'){
  //     str = parseFloat(postData[i]["Amount"].replace(/,/g, ''));
  //   } 
  //   postData[i]['Amount'] = str ? str : postData[i]["Amount"]

  //   finalAmount += postData[i]['Amount']
  // }

  return postData ?  (
      
      <div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 2fr 1fr"}}>  
              <div style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
              <input
                    onChange={handleFileChange}
                    id="csvInput"
                    name="file"
                    type="File"
                    style={{fontSize: 20}}
                />
                <button onClick={handleParse} style={{fontSize: 20}}>
                    Parse
                </button>
              
              </div>
              
              <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <h1 style={{display: "inline", fontSize: 40}}>My Balance: </h1>
                <div style={{display: "inline", marginLeft: 50}}>
                    <h1 style={{display: "inline", border: "solid"}}>${Math.round(finalAmount * 100)/100}</h1>
                </div>
              </div>
              <div style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                <button style={{fontSize: 20}} onClick={() => load({load: 1, data: postData})}>Overview</button>
                <button style={{fontSize: 20}}>Log Out</button>
              </div>
              
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 2fr 1fr"}}>
              <div></div>
              <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>      
                  <div>
                      <label for="fname">Transaction:</label><br/>
                      <input type="text" id="trans"/><br/>
                      <label for="lname">Amount:</label><br/>
                      <input type="text" id="cost"/><br/>
                      <button onClick={()=> {
                        let obj = {
                          'Description' : document.getElementById("trans").value,
                          'Amount' : parseInt(document.getElementById("cost").value, 10),
                          'Date' : new Date().toLocaleDateString()
                        }
                        let newArray = postData.slice();
                        newArray.push(obj);
                        let sum = 0;
                        for(let i = 0; i < newArray.length; i++){
                          sum += newArray[i]['Amount']
                        }
                        setPostData(newArray)
                        setFinalAmount(sum)
                      }} style={{marginTop: 10}}>Submit</button>
                  </div>
              </div>
              <div></div>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 2fr 1fr", marginTop: 50}}>
              <div></div>
              <table>
                  <tr>
                      <th>Transaction</th>
                      <th>Credit/Debit</th>
                      <th>Date</th>
                      <th>Delete</th>
                  </tr>
                  
                   

                    {postData.map((data, index) => {
                       return (
                      <tr key={index}>
                        <th>{data['Description']}</th>
                        <th>{data['Amount']}</th>
                        <th>{data['Date']}</th>
                        <th><button onClick={() => {

                            let newArray = postData.filter(data2 => data2 !== data)
                            let sum = 0;
                            for(let i = 0; i < newArray.length; i++){
                              sum += newArray[i]['Amount']
                            }
                        setPostData(newArray)
                        setFinalAmount(sum)


                        }}>DELETE</button></th>
                      </tr> 
                      )
                    })}

                        
                  
                  
              </table> 
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 2fr 1fr", marginTop: 20, marginBottom: 50}}>
            <div></div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
              <button onClick={() => {
                setPostData([])
                setFinalAmount(0)
              }}>DELETE ALL
              </button>
            </div>
            <div></div>
          </div>
          
          
      </div> 
                
  ) : (<div>Loading...</div>)
}