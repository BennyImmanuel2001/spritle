$(document).ready(function(){

    // $('input[type=date]').datepicker({
    //     dateFormat: 'dd/mm/yy'
    // });


$('#signin_btn').on('click',function(){
    var username = $('#Username').val().toString().toLowerCase();
    var password = $('#password').val();
    var age= getAge($('#datepicker').val());
    
    var url="http://localhost:8000";
        if(ValidateEmail(username) && ValidatePassword(password)  && age>0)
        {
            var user={
                username,
                password,
                age
            }
            $.ajax({
                url: `${url}/UserSignIn`,
                type: 'POST',
                data:JSON.stringify({user}),
                contentType: "application/json; charset=utf-8",
                dataType   : "json",
                success: function (res) {
                   if(res.responseText=="Data Inserted.")
                   {
                    window.location.replace(`${url}/ticketBooking`);
                   }else{
                       alert(res.responseText)
                   }
                }, error: function (err) {
                    if(err.responseText=="Data Inserted.")
                    {
                     window.location.replace(`${url}/ticketBooking`);
                    }else{
                        alert(err.responseText)
                    }
                }
            });
        }

})

});



// var from, to, date, availableCities = [
//     "Mumbai",
//     "Kolkata",
//     "Delhi",
//     "Chennai",
//     "Bangalore",
//     "Hyderabad",
//     "Ahmadabad",
//     "Pune",
//     "Surat",
//     "Kanpur",
//     "Jaipur",
//     "Lucknow",
//     "Nagpur",
//     "Patna",
//     "Indore",
//     "Vadodara",
//     "Bhopal",
//     "Coimbatore",
//     "Ludhiana",
//     "Kochi",
//     "Visakhapatnam",
//     "Agra",
//     "Varanasi",
//     "Madurai",
//     "Meerut",
//     "Nashik",
//     "Jabalpur",
//     "Jamshedpur",
//     "Asansol",
//     "Dhanbad",
//     "Faridabad",
//     "Allahabad",
//     "Amritsar",
//     "Vijayawada",
//     "Rajkot"
//   ];