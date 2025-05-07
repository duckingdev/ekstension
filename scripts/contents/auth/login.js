// check if has token
let hasToken = null;
const queryString = window.location.href;
if (window.location.href == 'https://duckingdelivery.com/customer/login?logout')
{
  removeToken()
}
setToken()
function setToken()
{
  chrome.storage.sync.get(["dataDucking"], function (result)
  {
    if (result.dataDucking)
    {
      hasToken = result.dataDucking;
      localStorage.setItem("tokenDucking", result.dataDucking);
      checkToken(result.dataDucking);
      // checkToken()
    } else
    {
      removeToken()
    }
  });
}

const logoutHandler = function ()
{
  $("#logout-btn").on("click", function ()
  {
    chrome.storage.sync.set(
      { "logout_extension": true },
      function ()
      {
        return true;
      }
    );
    removeToken()
    location.reload();
  });
};

function removeToken()
{
  // remove token from local storage
  localStorage.removeItem("tokenDucking");
  // remove token from chrome storage
  try
  {
    chrome.storage.sync.remove(["dataDucking"], function () { });
  } catch {
    if (location.hostname !== "duckingdelivery.com")
    {
      location.reload()
    }
  }
}

function checkToken(hasTok)
{
  if (hasTok)
  {
    let tokenExp = jwt_decode(hasTok);
    if (tokenExp.exp < Date.now() / 1000)
    {
      removeToken()
      hasTok = null;
    }

  }
}

const loginHandler = function ()
{
  $("#login-btn").on("click", function ()
  {
    var email = $("#inputEmail").val();
    var password = $("#inputPassword").val();
    // ajax login
    loginAjax(email, password)
  });
};

let urlSearch = window.location.search;
let urlParams = new URLSearchParams(urlSearch);
if (location.hostname == "duckingdelivery.com" && urlParams.get('e164'))
{
  let e164 = window.atob(urlParams.get('e164'))
  let objE164 = JSON.parse(e164);
  let email = objE164.email;
  let password = objE164.password;
  loginAjax(email, password)
}

function loginAjax(email, password)
{
  $.ajax({
    url: "https://ext.duckingdelivery.com/customers/login",
    type: "POST",
    data: {
      email: email,
      password: password,
    },
    beforeSend: function ()
    {
      if (location.hostname !== "duckingdelivery.com")
      {
        $("#login-btn").html("Logging in...");
        // disable the login button
        $("#login-btn").prop("disabled", true);
      }
    },
    success: function (data)
    {
      // save token to local storage
      let status = data.status;
      if (status == "success")
      {
        localStorage.setItem("tokenDucking", data.data.token);
        chrome.storage.sync.set(
          { "dataDucking": data.data.token },
          function ()
          {
            return true;
          }
        );
        if (location.hostname !== "duckingdelivery.com")
        {
          setCustomer(data.data.token);
          $("#loginDuckingBox").hide();
          // enable the login button
          $("#login-btn").prop("disabled", false);
          $("#login-btn").html("Login");
          location.reload();
        }
      } else
      {
        if (location.hostname !== "duckingdelivery.com")
        {
          // if dara.messege is array
          if (Array.isArray(data.message))
          {
            alert(data.message[0].message);
          }
          //  if data.message is another string
          if (typeof data.message == "string")
          {
            if (data.message == "customer not found")
            {
              alert("Invalid password or email");
            } else if (data.message == "email or password invalid")
            {
              alert("Invalid password or email");
            } else
            {
              alert('Login failed');
            }
          }
          $("#login-btn").html("Login");
          // enable the login button
          $("#login-btn").prop("disabled", false);
        }
      }
    },
    error: function ()
    {
      if (location.hostname !== "duckingdelivery.com")
      {
        // ajax error
        alert("Login failed");
        $("#login-btn").html("Login");
        // enable the login button
        $("#login-btn").prop("disabled", false);
      }
    },
  });
}

