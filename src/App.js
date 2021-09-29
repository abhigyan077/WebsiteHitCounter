import React from 'react';


function App() {
const [logFile, setLogFile] = React.useState(null) //let logFile = null
const [fromDate, setFromDate] = React.useState("")
const [toDate, setToDate] = React.useState("")
const [count, setCount] = React.useState("")
const [dateCount, setDateCount] = React.useState("");
const [queryUrl, setQueryUrl] = React.useState("");
const [totalCodeCount,setTotalCodeCount]  =React.useState("");
const [code400Count,setCode400Count]  =React.useState("");
const [code200Count,setCode200Count]  =React.useState("");
 
  
    const upload = (e) => {
      var total_count=0;
        // Convert the FileList into an array and iterate
        Array.from(e.target.files).forEach(file => {
            
            // Define a new file reader
            let reader = new FileReader();
            
            // Function to execute after loading the file
            reader.onload = () =>{ console.log(reader.result);
            
            // Read the file as a text
            console.log(file);
            let arr = (reader.result).split('\n');
            let result = arr.length;
            total_count=total_count+result;
            console.log("result",result);
            console.log("total",total_count);
            setCount(total_count)
            }
            
            
            
            reader.readAsText(file);
            
        });
        
    }
    const dateFormating = (d) => {
      let month = "";
      if ((d[5]+d[6]) === "01") month="Jan";  
      if ((d[5]+d[6]) === "02") month="Feb"; 
      if ((d[5]+d[6]) === "03") month="Mar"; 
      if ((d[5]+d[6]) === "04") month="Apr"; 
      if ((d[5]+d[6]) === "05") month="May"; 
      if ((d[5]+d[6]) === "06") month="Jun"; 
      if ((d[5]+d[6]) === "07") month="Jul"; 
      if ((d[5]+d[6]) === "08") month="Aug"; 
      if ((d[5]+d[6]) === "09") month="Sep"; 
      if ((d[5]+d[6]) === "10") month="Oct"; 
      if ((d[5]+d[6]) === "11") month="Nov";
      if ((d[5]+d[6]) === "12") month="Dec";
      return(d[8]+d[9]+"/"+month+"/"+d[0]+d[1]+d[2]+d[3]);  
    
    }
    const handleDate = (e) => {
      var date_count=0;
      var dateC=0;
      
      let lower = Date.parse(dateFormating(fromDate))
       let upper = Date.parse(dateFormating(toDate))
        // Convert the FileList into an array and iterate
        Array.from(e.target.files).forEach(file => {
            
          // Define a new file reader
          let reader = new FileReader();
          
          // Function to execute after loading the file
          reader.onload = () =>{ console.log(reader.result);
          
          // Read the file as a text
          console.log(file);
          let arr = (reader.result).split('\n');
          let result = arr.length;
          date_count=date_count+result;
          console.log("result",result);
          console.log("total",date_count);
          var flag=0;
          let dateArr = []
          for(let i =0; i<arr.length;i++){
            console.log(i,"th",arr[i])
            let str = arr[i];
            let squareBracket = str.indexOf("[");
            // console.log(squareBracket);
            let reqDate = Date.parse((str.substring(squareBracket+1,squareBracket+12)));
            // console.log(reqDate);
            dateArr.push(reqDate);
            }
           
            dateArr.forEach(element => {
              
              if(element>=lower && upper>=element) flag++;
              
            });
            dateC=dateC+flag;
            setDateCount(dateC);
            
          }
          
          
          
          reader.readAsText(file);
          
      });
      
  
        
    }
    const searchLink = (e) => {
      var total400=0;
      var total200=0;
      var totalhitss=0;
        // Convert the FileList into an array and iterate
        Array.from(e.target.files).forEach(file => {
            
            // Define a new file reader
            let reader = new FileReader();
            
            // Function to execute after loading the file
            reader.onload = () =>{ console.log(reader.result);
            
            // Read the file as a text
            console.log(file);
            let arr = (reader.result).split('\n');
            getCountByCode(arr); 
            }       
            reader.readAsText(file);
            const getCountByCode = (arr) => {
              let codeArray=[];
              let codeArray1=[];
              let code400 = 0, code200 = 0;
              for(var i0 = 0;i0<arr.length;i0++)
              {
                let str = arr[i0];
                let index = str.indexOf(queryUrl);
                if(index!== -1 && str.charAt(index-6)==" ")
                 {codeArray.push(str.charAt(index-9));}
               else if(index!== -1 && str.charAt(index-7)==" ") {
                codeArray.push(str.charAt(index-10));
               }
               else if(index!== -1 && str.charAt(index-8)==" "){
                codeArray.push(str.charAt(index-11));
               }
               else if(index!== -1 && str.charAt(index-5)==" "){ codeArray.push(str.charAt(index-8));}
                
              }
               totalhitss=totalhitss+codeArray.length;
              console.log(codeArray);
              
              codeArray.forEach(ele => {
                if(ele === "4") code400++;
                               
              })
              total400=total400+code400;
             
              codeArray.forEach(ele => {
                
                if(ele === "2") code200++;
                
              })
              total200=total200+code200;
             
              setTotalCodeCount(totalhitss);
              setCode400Count(total400);
              setCode200Count(total200);
          
            }
                    
            
        });
        
    }
    

  
   
    
  
    
    return(
      <div>
        <input onChange = {upload} type = 'file' multiple/>
        <br></br>
        <span>No of Logs:</span>{count}
        <br /> <br />
      FROM : <input type="date" onChange = {(e) => setFromDate(e.target.value)}></input>
      TO : <input type="date" onChange = {(e) => setToDate(e.target.value)}></input>
     
      <input type="file" onChange={handleDate} multiple/> 
      <br></br>
      <span>No of Logs:</span>{dateCount}<br></br>
      <p><b><em>Search</em></b></p>
      <input type="text" onChange={(e) => setQueryUrl(e.target.value)}/>
      <br></br>
      <input onChange = {searchLink} type = 'file' multiple/>
      <br></br>
        
       <div> Total Hits : {totalCodeCount} <br/>
      Successful Hits : {code200Count} <br/>
      Failed Hits : {code400Count}</div>
        </div>
    );
    
    }


export default App;