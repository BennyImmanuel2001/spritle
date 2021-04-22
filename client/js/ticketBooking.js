$(document).ready(function() {
    var url="http://localhost:8000";
    var city =  [
        "Mumbai",
        "Delhi",
        "Chennai",
        "Bangalore",
         ];
    $("#city").select2({
    data: city
    });


    $('.tabs').hide();
    $('#tab1').show();
   // $('#tab2').show();


   var booked=[];

   function validateUser(userDetails)
   {
      try{
            if(userDetails.name.trim()=="" ||userDetails.gender.trim()==""||userDetails.age.trim()=="") 
            {
                alert("Please enter valid details. ")
                return false
            }
        }
        catch{
            alert("Please enter valid details. ")
            return false
        }
       if(userDetails.gender.toLowerCase()=="male" ||userDetails.gender.toLowerCase()=="female")
       {
           return true
       }else{
        alert("Please enter valid Gender (male or female). ")
        return false
       }
    }
    var bookedPeople=[];
   //dblclick
  //checkGender($(this).parent().parent().parent()[0].id,$(this).parent().parent()[0].id,this.id,$(this).attr('data-seattype'),$(this).find('.gender').attr('data-seatGender'),this.id.split("_")[1])){
   $(document).on("click",".seat",function() {
      //
       alert($(this).find('.gender').attr('data-seatGender'))

       
       if( $(this).data('booked') != "now"){
           if($(this).data('booked') === false ){
                var userDetails= getUserDeatils();
                    if(validateUser(userDetails)){
                        if( checkGender($(this).parent().parent().parent()[0].id,$(this).parent().parent()[0].id,this.id,$(this).attr('data-seattype'),userDetails.gender,this.id.split("_")[1])){
                            if($(this).attr('data-booked')=="false"){
                                    $(this).attr('data-booked', 'now');
                                    $(this).data('booked',"now");
                                    $(this).find('.gender').attr('data-seatGender',userDetails.gender)
                                    $(this).find('.gender').text(userDetails.gender)
                                    var seatId=this.id.split("_")[1];
                                    let seatD={
                                        users:userDetails,
                                        seatNumber:this.id.split("_")[1],
                                        seatType:$(this).attr('data-seattype')
                                    }
                                    bookedPeople.push(seatD)
                                    console.log(bookedPeople)
                                    
                            }
                        }
                    }
            }
            else
            {
                alert("Already Booked!")
            }
        }
        else{
            $(this).attr('data-booked', 'false');
            $(this).data('booked',"false");
            $(this).find('.gender').attr('data-seatGender',"null")
            $(this).find('.gender').text("null")
            
            var seatId=this.id.split("_")[1];
            var temp= bookedPeople.filter(val=> val.seatNumber!=seatId);
            bookedPeople=[];
            bookedPeople=temp;
            console.log(bookedPeople)
        }
    // else{
    //     alert("Already Booked!")
    // }
    // if($(this).data('booked') == "now")
    
   });
   
   function getUserDeatils()
   {
       var name =prompt("enter name:");
       var age=prompt("enter age:");
       var gender=prompt("enter gender: (male or female)");
     // alert(name,age)
     var userDetails={
         name,
         age,
         gender
     }
     return userDetails;
   }
function checkGender(tableid,rowid,divid,seatType,gender,seatNumber){
    if(seatType=="window")
    {
      var middleseat=  $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=middle]').find('.gender').attr('data-seatgender');
      var middlebooked= $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=middle]').attr('data-booked');
   
      if(middleseat=="female" && gender.toLowerCase() =="male")
      {
        if( middlebooked!="now")
        {
            alert("This seat is reserved for women");
            return false;
        }
      }
      if(middleseat=="male" && gender.toLowerCase() =="female")
      {
        if( middlebooked!="now")
        {
            alert("This seat is reserved for Men");
            return false;
        }
      }
    }
    if(seatType=="middle")
    {
        var window=  $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=window]').find('.gender').attr('data-seatgender');
        var aisle=  $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=aisle]').find('.gender').attr('data-seatgender');
        
        var windowbooked=  $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=window]').attr('data-booked');
        var aislebooked=  $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=aisle]').attr('data-booked');
   
      
      if(window=="female" && gender.toLowerCase() =="male")
      {
        if( windowbooked!="now")
        {
            alert("This seat is reserved for women");
            return false;
        }
      }
      if(window=="male" && gender.toLowerCase() =="female")
      {
        if( windowbooked!="now")
        {
            alert("This seat is reserved for Men");
            return false;
        }
      }
      if(aisle=="female" && gender.toLowerCase() =="male")
      {
        if( aislebooked!="now")
        {
            alert("This seat is reserved for women");
            return false;
        }
      }
      if(aisle=="male" && gender.toLowerCase() =="female")
      {
        if( aislebooked!="now")
        {
            alert("This seat is reserved for men");
            return false;
        }
      }
     
    
    }
    if(seatType=="aisle")
    {
        var middleseat=  $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=middle]').find('.gender').attr('data-seatgender');
        var middlebooked= $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=middle]').attr('data-booked');
     
        if(middleseat=="female" && gender.toLowerCase() =="male")
        {
          if( middlebooked!="now")
          {
              alert("This seat is reserved for women");
              return false;
          }
        }
        if(middleseat=="male" && gender.toLowerCase() =="female")
        {
          if( middlebooked!="now")
          {
              alert("This seat is reserved for Men");
              return false;
          }
        }
      
   
}

    return true;

    //$('#'+tableid).find('#'+rowid).find('td').attr('data-seattype')
}



        $(document).on("click",".trainBookBtn",function() {
        //alert($(this).data('trainid'));
        $.ajax({
            url: `${url}/ticketDetails/${$(this).data('trainid')}`,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType   : "json",
            success: function (res) {
                $('.tabs').hide();
                $('#tab2').show();

             var swaper='left';
             var seatswaper=0;
             $('#leftTable').append("<tr id='leftTr_1'></tr>");
             $('#rightTable').append("<tr id='rightTr_1'></tr>");
           //  alert(res.seats.length/6)
             for(let i=0 ; i<res.seats.length;i++)
             {

               

            //    alert("left "+$('#leftTable').find('tr').length)
              //  alert("r "+$('#rightTable').find('tr').length)
               //  res.seats[i].booked=Boolean(Math.round(Math.random()));
               //  res.seats[i].gender=( Boolean(Math.round(Math.random())) ? "male" : "female");
              
                if(swaper=="left"){
                 $('#compartment').find('#leftTr_'+$('#leftTable').find('tr').length).append(`<td>
                 <div class="seat" id="seat_${res.seats[i].seatNumber}" data-booked="${res.seats[i].booked}"
                  data-seatType="${res.seats[i].type}">

                  <img class="seatimg" data-seatType="${res.seats[i].type}" data-booked="${res.seats[i].booked}" src="../images/seatImg.svg"/> 
                  <label  data-seatNumber='${res.seats[i].seatNumber}'">${res.seats[i].seatNumber}</label>
                  <label class='gender' data-seatGender='${res.seats[i].gender}'>${res.seats[i].gender}</label>
                 </div>
                </td> `);  
                 seatswaper++;
                 if(seatswaper==3)
                 {
                     swaper="right";
                     $('#leftTable').append(`<tr id='leftTr_${($('#leftTable').find('tr').length+1)}'></tr>`);
                    
                 }
                }
                else{
                    $('#compartment').find('#rightTr_'+$('#rightTable').find('tr').length).append(`<td>
                    <div class="seat" id="seat_${res.seats[i].seatNumber}"  data-booked="${res.seats[i].booked}"
                     data-seatType="${res.seats[i].type}">

                    <img class="seatimg" data-seatType="${res.seats[i].type}" data-booked="${res.seats[i].booked}" src="../images/seatImg.svg"/> 
                    <label data-seatNumber='${res.seats[i].seatNumber}'">${res.seats[i].seatNumber}</label>
                  <label class='gender'  data-seatGender='${res.seats[i].gender}'>${res.seats[i].gender}</label>

                    </div>
                  </td>  `);  
                    seatswaper--;
                    if(seatswaper==0)
                    {
                        swaper="left";
                        $('#rightTable').append(`<tr id='rightTr_${($('#rightTable').find('tr').length+1)}'></tr>`);
                    }
                }
             }

            }, error: function (err) {
                console.log(err)
            }
        });
    });










    $.ajax({
        url: `${url}/trainDetails`,
        type: 'GEt',
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success: function (res) {
            console.log(res)
            PopulateTable(res)
        }, error: function (err) {
               console.log(err)

        }
    });
function PopulateTable(arr)
{
    var trainTable =$('#trainTableBody');
    if(arr.length==0) return alert("NO Trains Available!")
    //trainTable.find('tr').length)
    
    trainTable.empty();
    for(let i=0;i<arr.length;i++)
    {
        trainTable.append(`<tr id='tr_${i}'>
        <td>${arr[i].trainId}</td>
        <td>${arr[i].date}</td>
        <td>${arr[i].from}</td>
        <td>${arr[i].to}</td>
        <td>    <button class="trainBookBtn" data-trainid='${arr[i].trainId}' id="bookBtn_${i}">Book Now</button>
      </td>
        </tr>`)
    }
}
    });




    // if(
    //     ($('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=window]').attr('data-booked')=="now" ||
    // $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=window]').attr('data-booked')=="false")&&(
    // $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=aisle]').attr('data-booked')=="now" ||
    // $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=aisle]').attr('data-booked')!="false")
    // ){



        // function checkGendessssr(tableid,rowid,divid,seatType,gender,seatNumber){
        //     if(seatType=="window")
        //     {
        //       var val=  $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=middle]').find('.gender').attr('data-seatgender');
        
        //     alert("type "+  $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=middle]').attr('data-booked'));
        //     if($('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=middle]').attr('data-booked')=="true"){
        //       if(val=="female" && gender.toLowerCase() =="male")
        //       {
        //           alert("This seat is reserved for women");
        //           return false;
        //       }
        //       if(val=="male" && gender.toLowerCase() =="female")
        //       {
        //           alert("This seat is reserved for men");
        //           return false;
        //       }
        //     }
        //     }
        //     if(seatType=="middle")
        //     {
        //         var window=  $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=window]').find('.gender').attr('data-seatgender');
        //         var aisle=  $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=aisle]').find('.gender').attr('data-seatgender');
                
        //         var windowbooked=  $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=window]').attr('data-booked');
        //         var aislebooked=  $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=aisle]').attr('data-booked');
           
              
        //       if(window=="female" && gender.toLowerCase() =="male")
        //       {
        //         if( windowbooked!="now")
        //         {
        //             alert("This seat is reserved for women");
        //             return false;
        //         }
        //       }
        //       if(window=="male" && gender.toLowerCase() =="female")
        //       {
        //         if( windowbooked!="now")
        //         {
        //             alert("This seat is reserved for Men");
        //             return false;
        //         }
        //       }
        //       if(aisle=="female" && gender.toLowerCase() =="male")
        //       {
        //         if( aislebooked!="now")
        //         {
        //             alert("This seat is reserved for women");
        //             return false;
        //         }
        //       }
        //       if(aisle=="male" && gender.toLowerCase() =="female")
        //       {
        //         if( aislebooked!="now")
        //         {
        //             alert("This seat is reserved for men");
        //             return false;
        //         }
        //       }
             
            
        //     }
        //     if(seatType=="aisle")
        //     {
        //       var middle=  $('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=middle]').find('.gender').attr('data-seatgender');
        //     if($('#'+tableid).find('#'+rowid).find('td').find('[data-seattype=middle]').attr('data-booked')=="now"){
              
        //       if(middle=="female" && gender.toLowerCase() =="male")
        //       {
        //           alert("This seat is reserved for women");
        //           return false;
        //       }
        //       if(middle=="male" && gender.toLowerCase() =="female")
        //       {
        //           alert("This seat is reserved for men");
        //           return false;
        //       }
        //     }
        // }
        
        //     return true;
        
        //     //$('#'+tableid).find('#'+rowid).find('td').attr('data-seattype')
        // }