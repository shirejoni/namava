<div dir="rtl">

## پروژه سایت نماوا با React

این پروژه برای دوره ی آموزش React.js دانشجویار نوشته شده است و درون این آموزش به صورت کامل پیاده سازی می شود شما می توانید به سورس کد پروژه به صورت رایگان و متن باز می تونید از طریق این ریپازیتور دسترسی داشته باشید 
  
## نصب و راه اندازی
برای راه اندازی پروژه نسخه بکندی که نوشته شده است را در ابتدا راه اندازی کنید توجه کنید که این بکند فقط کار Reverse Proxy را انجام خواهد داد و هر درخواستی به ان به سایت نماوا هدایت خواهد شد ولی برای جلوگیری CORS لازم هست که استفاده شود.

```bash
$ npm install
$ cd namava_backend_reverse_proxy
$ npm install
// it will start reverse proxy backend in port 8080
$ npm start 
$ cd ../
// it will start react in port 3000
$ npm start
```

</div>

