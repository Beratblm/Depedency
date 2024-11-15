Node JS Dependency confusion exploit

Dependency Confusion

- Dependency confusion zaafiyetini sömürmek için scriptlerim

## NOT ##
- `index.js` kullanabilmek için VPS server üzerinde DNS server kurmanız gerekir. Gelen veriler DNS loglarına kaydedilecektir. VPS server üzerinde kaydedilen logların query kısmını alıp bir adet base64 decoder olması gereklidir. Bunun nedeni, verileri DNS ile yolluyor olmamızdır ve bildiğiniz gibi DNS, 63 karakterden fazla veri göndermenize izin vermez. Bu yüzden veriyi base64 formatında gönderdim. Eksik kısımlar olabilir, isterseniz ekleme yapabilirsiniz.


- Scripts to exploit the Dependency Confusion vulnerability

## NOTE ##
- To use `index.js`, you need to set up a DNS server on a VPS. The incoming data will be logged in the DNS logs. You will need to extract the query part from the logs stored on the VPS and use a base64 decoder. This is because we are sending the data via DNS, and as you know, DNS restricts the transmission of more than 63 characters. Therefore, I encoded the data in base64. There may be missing parts, so feel free to add them if necessary.
