
const customerDucking = function ()
{
  let customer = hasToken ? jwt_decode(hasToken) : null;

  if (customer)
  {
    return customer;
  } else
  {
    return null;
  }
}
const setCustomer = function (token = null)
{
  let customer = customerDucking();
  if (token)
  {
    customer = jwt_decode(token);
  }
  if (customer)
  {
    $('#loginBox').hide();
    $('#marking').show();
    $('#marking').html(customer.data.marking);
    $('#member').show();
    let member = customer.data.member;
    // remove 'import' from member
    member = member.replace('Import', '');
    $('#member').html(member);
    // $('#data-member'). display: inline-flex;
    $('#data-member').show();
    if(webTaobao || webTmall){
      $('#data-login').removeClass('col-7');
      $('#data-login').addClass('col-4 p-0');
    }
    return;
  }
}