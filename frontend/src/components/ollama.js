import { useEffect, useState } from "react"



export default function OllamaOverview({load, data}){
    
    const[ollamaInfo, setOllamaInfo] = useState(null)
    console.log(ollamaInfo)
    useEffect(() => {

        
        fetch("http://127.0.0.1:5000", {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify({
                content : data.data
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            }).then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data)
                setOllamaInfo(data)
            })
              
    
        
    }, [])


    let newArr = data.data

    let descriptionArray = []

    for(let i = 0; i < newArr.length; i++){
        try{
            descriptionArray.push(newArr[i]['Description'])
        } catch(error){
            //pass through
        }
    }
    console.log(descriptionArray)


    let splitArray = ollamaInfo !== null ? ollamaInfo['content'].split("\n") : []
      



    return ollamaInfo ? (
    <div>
        <div>
            <button onClick={() => load({load : 1, data: data.data})}>GO BACK</button>
        </div>
        <h1 style={{textAlign: 'center'}}>OLLAMA Overview</h1>
        <p>
            {splitArray.map(str => {
                if(str === '\n'){
                    return <br></br>
                } else{
                    return <p>{str}</p>
                }
            })}
        </p>
    </div>) : (<div><h1>Loading...</h1></div>)
}