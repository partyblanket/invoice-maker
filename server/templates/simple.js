module.exports = (invoice, user) => {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();
  const due = new Date(invoice.dueDate)
  const invoiceNumber = '#12345'
  let total = 0
  const lines = invoice.invoiceLines.map((el, index) => {
    total += el.amount * el.price
    return (`
  <tr class="item">
  <td>
      ${el.description}
  </td>
  
  <td>
    ${el.amount * el.price}
  </td>
</tr>

  `)})
  return `
  <!doctype html>
    <html>
      <head>
          <meta charset="utf-8">
          <title>Invoice ${invoiceNumber}</title>
          
          <style>
          .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              font-size: 16px;
              line-height: 24px;
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              color: #555;
          }
          
          .invoice-box table {
              width: 100%;
              line-height: inherit;
              text-align: left;
          }
          
          .invoice-box table td {
              padding: 5px;
              vertical-align: top;
          }
          
          .invoice-box table tr td:nth-child(2) {
              text-align: right;
          }
          
          .invoice-box table tr.top table td {
              padding-bottom: 20px;
          }
          
          .invoice-box table tr.top table td.title {
              font-size: 45px;
              line-height: 45px;
              color: #333;
              text-align: left;
          }
          
          .invoice-box table tr.information table td {
              padding-bottom: 40px;
          }
          
          .invoice-box table tr.heading td {
              background: #eee;
              border-bottom: 1px solid #ddd;
              font-weight: bold;
          }
          
          .invoice-box table tr.details td {
              padding-bottom: 20px;
          }
          
          .invoice-box table tr.item td{
              border-bottom: 1px solid #eee;
          }
          
          .invoice-box table tr.item.last td {
              border-bottom: none;
          }
          
          .invoice-box table tr.total td:nth-child(2) {
              border-top: 2px solid #eee;
              font-weight: bold;
          }
          
          @media only screen and (max-width: 600px) {
              .invoice-box table tr.top table td {
                  width: 100%;
                  display: block;
                  text-align: center;
              }
              
              .invoice-box table tr.information table td {
                  width: 100%;
                  display: block;
                  text-align: center;
              }
          }
          
          /** RTL **/
          .rtl {
              direction: rtl;
              font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          }
          
          .rtl table {
              text-align: right;
          }
          
          .rtl table tr td:nth-child(2) {
              text-align: left;
          }
          </style>
      </head>

      <body>
          <div class="invoice-box">
              <table cellpadding="0" cellspacing="0">
                  <tr class="top">
                      <td colspan="2">
                          <table>
                              <tr>
                                  <td class="title">
                                      <img src="${user.logo}" style="max-width:300px; max-height: 100px; object-fit: contain;">
                                  </td>
                                  
                                  <td>
                                      Invoice #: ${invoiceNumber}<br>
                                      Created: ${new Intl.DateTimeFormat('de-DE', dateOptions).format(today)}<br>
                                      Due: ${new Intl.DateTimeFormat('de-DE', dateOptions).format(due)}
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  
                  <tr class="information">
                      <td colspan="2">
                          <table>
                              <tr>
                                  <td>
                                      ${user.company}<br>
                                      ${user.name}<br>
                                      ${user.phone}<br>
                                      ${user.addressLineOne}<br>
                                      ${user.addressLineTwo ? 'user.addressLineTwo+<br>' : ''}
                                      ${user.city}, ${user.postcode}
                                  </td>
                                  
                                  <td>
                                      ${invoice.billingCompany}<br>
                                      ${invoice.billingName}<br>
                                      ${invoice.billingPhone}<br>
                                      ${invoice.billingAddressLineOne}<br>
                                      ${invoice.billingCity}, ${invoice.billingPostcode}
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  

                  
                  <tr class="heading">
                      <td>
                          Item
                      </td>
                      
                      <td>
                          Price
                      </td>
                  </tr>
                  
                  ${lines}
                  
                  <tr class="total">
                      <td></td>
                      
                      <td>
                        Total: $${total}
                      </td>
                  </tr>
              </table>
              <div style='text-align: center; width: 100%;'>
              ${invoice.terms}
              </div>
          </div>
      </body>
    </html>
    `;
};