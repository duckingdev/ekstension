
const customerDucking = function () {
  let customer = hasToken ? jwt_decode(hasToken) : null;

  if (customer) {
    return customer;
  } else {
    return null;
  }
}
const setCustomer = function (token = null) {
  let customer = customerDucking();
  if (token) {
    customer = jwt_decode(token);
  }
  if (customer) {
    document.getElementById('loginBoxDuck').style.display = 'none';

    // Tampilkan elemen #marking dan set isinya
    document.getElementById('marking').style.display = 'block';
    document.getElementById('marking').innerHTML = customer.data.marking;

    // Tampilkan elemen #member dan set isinya setelah menghapus kata 'Import'
    document.getElementById('data-member').style.display = 'inline-flex';
    // flex column
    document.getElementById('data-member').style.flexDirection = 'column';
    document.getElementById('member').style.display = 'block';
    let member = customer.data.member.replace('Import', '');
    document.getElementById('member').innerHTML = member;

    // Tampilkan elemen #data-member

    // Ubah class jika webTaobao atau webTmall bernilai true
    if (webTaobao || webTmall) {
      const dataLogin = document.getElementById('data-login');
      dataLogin.classList.remove('col-7');
      dataLogin.classList.add('col-4', 'p-0');
    }
    return;
  }
}