import Plot from 'react-plotly.js';


export default function Overview({load, data}){
    

    
    let months = new Map();
    months.set("01", []);
    months.set("02", []);
    months.set("03", []);
    months.set("04", []);
    months.set("05", []);
    months.set("06", []);
    months.set("07", []);
    months.set("08", []);
    months.set("09", []);
    months.set("10", []);
    months.set("11", []);
    months.set("12", []);

    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let histArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let counter = 0;

    let newData = data.data
    for(let i = 0; i < newData.length; i++){
        try{
            let arr = months.get(newData[i]['Date'].substring(0,2))
            arr.push(newData[i])
        } catch(error){
            console.log("No entry found")
        }
    }
    console.log(months)



    function calculateAverageAmount(key){
        let sum = 0;
        let data = months.get(key)
        for(let i = 0; i < data.length; i++){
            sum += data[i]['Amount']
        }
        
        let result = Math.round((parseFloat(sum) * 100) / 100)
        histArray[counter] = result;
        counter++;
        return result;
    }


    // Plotly.newPlot('myDiv', 
    //     {

    //         histfunc: "sum",
    //         y: histArray,
    //         x: months.keys(),
    //         type: "histogram",
    //         name: "sum"
        
    //       }

    return (

        <div>
            <div style={{display: "grid", gridTemplateColumns: '1fr 1fr'}}>
              <div>
                <button onClick={() => load({load : 0, data: data.data})}>GO BACK</button>
              </div>
              <div style={{display: "flex", justifyContent: "end"}}>
                <button onClick={() => load({load : 2, data: data.data})}>OLLAMA</button>
              </div>
                
            </div>
            <div>
                {
                    months.keys().map((key) => {
                        
                        
                        let month = ""
                        switch (key) {
                            case "01":
                              month = "January";
                              break;
                            case "02":
                              month = "February";
                              break;
                            case "03":
                               month = "March";
                              break;
                            case "04":
                              month = "April";
                              break;
                            case "05":
                              month = "May";
                              break;
                            case "06":
                              month = "June";
                              break;
                            case "07":
                              month = "July";
                              break;
                            case "08":
                              month = "August";
                              break;
                            case "09":
                              month = "September";
                              break;
                            case "10":
                              month = "October";
                              break;
                            case "11":
                              month = "November";
                              break;
                            case "12":
                              month = "December";
                              break;
                            default:
                              month = "Nothing"
                          }
                        
                          let avg = calculateAverageAmount(key)
                          console.log(avg)

                          return(

                            <div>
                                <h1>{month}:</h1>
                                <table>
                                    <tr>
                                        <th>Transaction</th>
                                        <th>Credit/Debit</th>
                                        <th>Date</th>
                                        <th>Average Amount</th>
                                    </tr>
                                    {
                                        months.get(key).map(data => {
                                            console.log(data)

                                            return (
                                                <tr>
                                                    <th>{data['Description']}</th>
                                                    <th>{data['Amount'] ? (Math.round(data['Amount']* 100) / 100) : 0}</th>
                                                    <th>{data['Date']}</th>
                                                    <th></th>
                                                </tr>
                                            )
                                        })

                                    }
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>{avg}</th>
                                    </tr>


                                </table>

                            </div>
                          )
                    })
                }
                <div style={{marginTop: 30}}>
                    <h1>Charts</h1>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Plot style={{border: "solid"}}
                            data={[
                            {type: 'bar', x: monthNames, y: histArray},
                            ]}
                            layout={ {width: 500, height: 500, title: {text: 'Monthly spending'}} }
                            />
                    </div>
                </div>
            </div>

        </div>


    )
}