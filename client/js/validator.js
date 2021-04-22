function ValidateEmail(mail) 
{
 // return true;

  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
    {
      return true;
    }

  alert("You have entered an invalid email address!");
  return false;
}


function ValidatePassword(password){
  if(password.trim() == "" )
  {
    alert("Please enter a password!");
    return false;
  }

    if(password.length <8)
    {
        alert("Password must contain atleast 8 characters")
        return false;
    }

    return true;
}

function getAge(dateString){
  let birth = new Date(dateString);
  let now = new Date();
  let beforeBirth = ((() => {birth.setDate(now.getDate());birth.setMonth(now.getMonth()); return birth.getTime()})() < birth.getTime()) ? 0 : 1;
  return now.getFullYear() - birth.getFullYear() - beforeBirth;
}