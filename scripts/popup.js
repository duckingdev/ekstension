
// get local storage data from current tab 
chrome.tabs.query({
  active: true,
  currentWindow: true
}, function (tabs) {
  dataDucking = localStorage.getItem('data');
});

let dataDucking = false;
 chrome.storage.sync.get(['dataDucking'], function (result)
{
  dataDucking = result.dataDucking;
  chrome.storage.sync.get(['exp'], function(result){
    console.log('Value currently is ' + result.exp);
  })
  console.log('dataDucking: ' + dataDucking);
  if (dataDucking) 
  {
    // if has token, show the token
    let tokenDucking = dataDucking;
    let tokenDckingDecoded = jwt_decode(tokenDucking);
    // check if token is expired
    if (tokenDckingDecoded.exp < Date.now() / 1000)
    {
      // if expired, remove token from local storage
      chrome.storage.sync.remove(['dataDucking'], function (result){
        console.log('tokenDucking removed');
      });
      // show popup
      $('#login-form').show();
    } else
    {
      $('#login-form').hide();
      // if not expired, show the token
      $('#logout').show();
      $('#logout-btn').on('click', function (){
        chrome.storage.sync.remove(['dataDucking'], function (result){
          console.log('tokenDucking removed');
        });
        $('#logout').hide();
        // #login-btn
        
        $('#login-form').show();
        // reload current tab
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, function (tabs) {
          chrome.tabs.reload(tabs[0].id);
        }
        );
      });

    }
  
  } else
  {
    $(function ()
    {
  
      $('#login-form').show();
      $('#logout').hide();
      // handle the login form
      $('#login-form').submit(function (e)
      {
        e.preventDefault();
        var email = $('#inputEmail').val();
        var password = $('#inputPassword').val();
        // ajax login
        $.ajax({
          url: 'https://ext.duckingdelivery.com/customers/login',
          type: 'POST',
          data: {
            email: email,
            password: password
          },
          beforeSend: function ()
          {
            $('#login-btn').html('Logging in...');
            // disable the login button
            $('#login-btn').prop('disabled', true);
          },
          success: function (data)
          {
            if (data.status === 'success')
            {
              // remove storage
              chrome.storage.sync.remove(['dataDucking','dataExp'], function ()
              {
                console.log('Value is set to ');
              });
              let exp = data.data.expired_in;
              chrome.storage.sync.set({ 'dataDucking': data.data.token,'exp':exp }, function ()
              {
                console.log('token saved');
              });
              // hide the login form
              $('#login-form').hide();
              // show the logout button
              $('#logout').show();
              $('#login-btn').html('Login');
              // enable the login button
              $('#login-btn').prop('disabled', false);
              // reload current tab
              chrome.tabs.query({
                active: true,
                currentWindow: true
              }, function (tabs)
              {
                chrome.tabs.reload(tabs[0].id);
              });
  
            } else
            {
              // login failed
              alert('Login failed');
            }
          },
          error: function ()
          {
            // ajax error
            alert('Login failed');
          }
        });
      });
    });
  }
});




