import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function regPage2() {
    const [numbers, setNumbers] = useState([]);
    const [newNumber, setNewNumber] = useState('');
    

    const addNewPhoneNumber = () => {
        if(newNumber != ""){
            const arr: any = [...numbers, newNumber]
            console.log(newNumber);
            console.log(arr);
            setNewNumber('')
            setNumbers(arr)
        }
   
    }

    const deleteNumber = (delNumber:any) =>{
        let arr:never[] = []

        for (let index = 0; index < numbers.length; index++) {
            if(numbers[index] != delNumber){
                arr.push(numbers[index] )
            }
        }

        setNumbers(arr)
    }
        
  return (
    <Grid container rowGap={0} columnGap={0}>

        <Grid container item xs={6} alignItems="center"  justifyContent="center" style={{minHeight:"100vh"}}>  
        
            <Grid container item xs={6} direction="column"  rowSpacing={2} style={{ maxWidth: '50%' }}>  
                <Grid  item xs={6}>  
                    <Button variant="contained" className='goBack' style={{width: "30%"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width:"25"}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                        Go Back
                    </Button>
                </Grid>

                <Grid  item xs={6}>  
                    <Typography variant="h4" sx={{ fontWeight: 500, fontSize: 36}} >
                        Tell us a bit about your company.
                    </Typography>
                </Grid>


         

                <TextField id="standard-basic" label="Company Name" variant="standard" sx={{mt:5}} />
                <TextField id="standard-basic" label="Address" variant="standard" sx={{mt:3}} />
                <Grid  container item xs={13} sx={{mt:2}}> 
                    <Grid  item xs={numbers.length == 5 ?12: 10}>  
                        <TextField id="standard-basic" label="Contact No" variant="standard" sx={{width:"100%"}} onChange={(e)=> setNewNumber(e.target.value)} value={newNumber} />
                    </Grid>

                    {numbers.length != 5?
                        
                        <Grid  item xs={2}>  
                            <Button variant="contained" className='addNumber' style={{width: "100%"}} onClick={addNewPhoneNumber}>
                                Add
                            </Button>
                        </Grid>
                        :

                        <>
                        </>
                    }
                </Grid>

                <Grid  container item xs={12} sx={{mt:1}}> 

                        {numbers.map((no)=> { 
                            return (
                                <Grid item xs={4} sx={{mt:0.8}}> 
                                    <span className='phoneNumberSpan'>{no}  
                                        <button className='spanBtn' onClick={()=>deleteNumber(no)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width:"20",marginLeft:"10"}}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button> 
                                    </span> 
                                    
                                </Grid>
                          )
                        })}

                 
                </Grid>

                <Button variant="contained" className='createAcc' style={{width: "100%",marginTop:"20%"}}>
                    Continue
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width:"25", marginLeft:"20"}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Button>
            </Grid>
        </Grid>

        

        <Grid container item xs={6} alignItems="center"  justifyContent="center" style={{backgroundColor:"#DBDBDB"}}>  

            <Grid item xs={6} >  
                    <img src="../../assets/svg/ca-p2.svg" alt="" style={{width:500}} />
            </Grid>

        </Grid>

    </Grid>
  )
}

export default regPage2