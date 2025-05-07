class ItemDucking
{

  save = async (data) =>
  {
    const customer_id = jwt_decode(hasToken).data.id;
    data.customer_id = customer_id;
    let status = '';
    const ajaxRequest = async (postData) =>
    {
      try
      {
        console.log(postData);
        const response = await $.ajax({
          url: 'https://ext.duckingdelivery.com/data/post/',
          type: 'POST',
          data: postData,
          beforeSend: function (xhr)
          {
            xhr.setRequestHeader('Authorization', hasToken);
          },
        });
        status = response.message;
        console.log(response);
      } catch (err)
      {
        alert(err.message)
      }
    };

    if (Array.isArray(data))
    {
      for (let i = 0; i < data.length; i++)
      {
        await ajaxRequest(data[i]);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } else
    {
      await ajaxRequest(data);
    }

    if (status === 'created')
    {
      alertDucking('#duckingAlert', 'Produk berhasil ditambahkan ke list pembelian', 'success');
    } else if (status === 'updated')
    {
      alertDucking('#duckingAlert', 'Produk ini berhasil diupdate', 'info');
    }
  };

  get = async () =>
  {
    await $.ajax({
      url: 'https://ext.duckingdelivery.com/data/get?group=true',
      type: 'GET',
      beforeSend: function (xhr)
      {
        xhr.setRequestHeader('Authorization', hasToken);
      }
    }).done(function (data)
    {
      data = data.data;
      // remove data from local storage
      localStorage.removeItem('data');
      // add data to local storage
      localStorage.setItem('data', JSON.stringify(data));
    });
    return JSON.parse(localStorage.getItem('data'));
  }

  delete = async (id, w = null, s = null) =>
  {
    let datas = JSON.parse(localStorage.getItem('data'));
    if (id.length)
    {
      id = JSON.parse(id);
      w = w == 'productDetail' ? '?detailProduct=true' : w == 'product' ? '?product=true' : w == 'seller' ? '?seller=true' : '?detailProduct=true';
      for (let i = 0; i < id.length; i++)
      {

        await $.ajax({
          url: 'https://ext.duckingdelivery.com/data/delete/' + id[i] + w,
          type: 'DELETE',
          beforeSend: function (xhr)
          {
            xhr.setRequestHeader('Authorization', hasToken);
          }
        }).done(function (data)
        {
          let product_deleted = data.message.product_deleted;
          let seller_deleted = data.message.seller_deleted;
          if (seller_deleted)
          {
            if (s == null)
            {
              $('div.card-seller[data-id="' + id[i] + '"]').parent().remove();
            } else
            {
              $('.seller[data-id="' + id[i] + '"]').remove();
            }
          }
          if (product_deleted)
          {
            if (s == null)
            {
              $('input[data-id="' + id[i] + '"][data-checked="detailitem"]').parent().parent().parent().parent().parent().parent().parent().remove();
            } else
            {
              $('input[data-id="' + id[i] + '"][data-checked="detailitem"]').parent().parent().parent().parent().parent().remove();
            }
          } else
          {
            if (s == null)
            {
              $('input[data-id="' + id[i] + '"][data-checked="detailitem"]').parent().parent().parent().remove();
            } else
            {
              $('input[data-id="' + id[i] + '"][data-checked="detailitem"]').parent().parent().remove();
            }
          }
        });
        // wait for 1 second
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } else
    {
      let url = 'https://ext.duckingdelivery.com/data/delete/' + id;

      if (w == 'productDetail')
      {
        url = 'https://ext.duckingdelivery.com/data/delete/' + id + '?detailProduct=true';
      }
      if (w == 'product')
      {
        url = 'https://ext.duckingdelivery.com/data/delete/' + id + '?product=true';
      }
      if (w == 'seller')
      {
        url = 'https://ext.duckingdelivery.com/data/delete/' + id + '?seller=true';
      }
      await $.ajax({
        url: url,
        type: 'DELETE',
        beforeSend: function (xhr)
        {
          xhr.setRequestHeader('Authorization', hasToken);
        },
        success: function (data)
        {
          let product_deleted = data.message.product_deleted;
          let seller_deleted = data.message.seller_deleted;
          if (w = 'productDetail')
          {
            if (seller_deleted)
            {
              if (s == null)
              {
                $('button[data-id="' + id + '"][data-w="' + w + '"]').parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().remove();
              } else
              {
                $('button[data-id="' + id + '"][data-w="' + w + '"]').parent().parent().parent().parent().parent().parent().parent().remove();
              }
            } else if (product_deleted)
            {
              if (s == null)
              {
                $('button[data-id="' + id + '"][data-w="' + w + '"]').parent().parent().parent().parent().parent().parent().parent().remove();
              } else
              {
                $('button[data-id="' + id + '"][data-w="' + w + '"]').parent().parent().parent().parent().parent().parent().remove();
              }
            } else
            {

              $('button[data-id="' + id + '"][data-w="' + w + '"]').parent().parent().parent().remove();

            }
          }
          if (w = 'product')
          {
            if (seller_deleted)
            {
              if (s == null)
              {
                $('button[data-id="' + id + '"][data-w="' + w + '"]').parent().parent().parent().parent().parent().parent().parent().remove();
              } else
              {
                $('button[data-id="' + id + '"][data-w="' + w + '"]').parent().parent().parent().parent().remove();
              }
            } else
            {
              if (s == null)
              {
                $('button[data-id="' + id + '"][data-w="' + w + '"]').parent().parent().parent().parent().remove();
              } else
              {
                $('button[data-id="' + id + '"][data-w="' + w + '"]').parent().parent().parent().remove();
              }
            }
          }

        },
        error: function (err)
        {
          alert(err.message)
        }
      });
    }
    return datas;
  }

  deleteAll = () =>
  {
    localStorage.removeItem('data');
  }


  acakKonten = (data) =>
  {

  }

}