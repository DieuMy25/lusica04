var slide = ["Image/banner4.png", "Image/banner1.png","Image/banner2.png","Image/banner3.png","Image/banner.png"];
var index=0;
function back() {
    index--;
    if (index<=0) {
        index=slide.length-1;
    }
    document.getElementById("banner").src = slide[index];
}
function next() {
    index++;
    if (index==slide.length) {
        index=0;
    }
    document.getElementById("banner").src = slide[index];
}
setInterval(next,2500);

// check form--------------------------------------------------------------------------------------------
function check() {
    var tel = document.getElementById("tel_ip");
    var tel_er = document.getElementById("tel_er");
    if(tel.value== ""){
        tel_er.innerHTML ="Vui lòng nhập số điện thoại";
        tel.focus();
        tel.style.backgroundColor = "rgb(252, 244, 233)";
        return false;
    }else{
        if(tel.value.length==10){
            tel_er.innerHTML ="";
            tel.style.backgroundColor = "";
        }else{
            tel_er.innerHTML ="Số điện thoại chưa đúng";
        }
    }
    
    var pin = document.getElementById("pin_ip");
    var pin_er = document.getElementById("pin_er");
    if(pin.value== ""){
        pin_er.innerHTML ="Vui lòng nhập mã PIN";
        pin.focus();
        pin.style.backgroundColor = "rgb(252, 244, 233)";
        return false;
    }else{
        if(pin.value.length==6){
            pin_er.innerHTML ="";
            pin.style.backgroundColor = "";
        }else{
            pin_er.innerHTML ="Mã PIN gồm 6 kí tự";
            return false;
        }
    }
    alert("Đăng nhập thành công")
}
// -------------------------------------------------------------------------------------------------------

// Cart---------------------------------------------------------------------------------------------
// var btn = document.getElementsByTagName("button");
// for (let i = 0; i < btn.length; i++) {
//     btn[i].addEventListener("click", function () {
//         var hinh = btn[i].parentElement.childNodes[1].childNodes[1].src;
//         var ten =  btn[i].parentElement.childNodes[5].childNodes[1].text
//         var gia = btn[i].parentElement.childNodes[7].value;
//         alert(hinh);
//         alert(ten);
//         alert(gia);
// });
// }
var cart = JSON.parse(localStorage.getItem("cart"));
if(cart!= null){
    giohang = cart;
}else{
    var giohang = [];
}
// var btn = document.getElementsByTagName("button");
var btn = document.getElementsByClassName("addtocart")
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
        var hinh = btn[i].parentElement.childNodes[1].childNodes[1].src;
        var ten =  btn[i].parentElement.childNodes[5].childNodes[1].text
        var gia = btn[i].parentElement.childNodes[7].value;
        var soluong = 1;
        var kttrung = 0;
        // alert(hinh);
        // alert(ten);
        // alert(gia);
        for (let j = 0; j < giohang.length; j++) {
            if (giohang[j]["ten"]==ten) {
                // let slmoi = soluong + giohang[j]["soluong"];
                // giohang[i]["soluong"] = slmoi;
                giohang[j]["soluong"] += soluong;
                kttrung = 1;
                alert(`Sản phẩm đã có trong giỏ hàng.
                Đã tăng số lượng`);
                break;
            }
        }
        if (kttrung==0) {
            var sp = {
            "hinh" : hinh,
            "ten": ten,
            "gia": gia,
            "soluong": soluong
        }
        giohang.push(sp);
        }
        
        // Đẩy giỏ hàng lên localstorage
        localStorage.setItem("cart",JSON.stringify(giohang));
        // Lấy về để show
        getsoluong();
        
});
}

function loaddatacart(){
    getsoluong();
    showcart();
    total();
    
}

function getsoluong() {
    var cart = JSON.parse(localStorage.getItem("cart"));
    if(cart!= null){
        document.getElementById("slsp").innerHTML = cart.length;
    }
}
function showcart() {
    var cart = JSON.parse(localStorage.getItem("cart"));
    if(cart!= null){
        var kq ="";
        for (let i = 0; i < cart.length; i++) {
            var ttien = parseInt(cart[i]["gia"] * cart[i]["soluong"]);
                kq += ` <hr>
                        <div class="padtop10">
                            <div class="sp-1" >
                                <a onclick="xoa(`+i+`)" class="del" style="cursor: pointer;">
                                    <img src="Image/bin.png" style="width: 25px; padding-top: 35px;">
                                </a>
                            </div>
                            <div class="sp-2">
                                <div class="sp-hinh">
                                    <img src="`+cart[i]["hinh"]+`" width="100%" height="112px">
                                </div>`+cart[i]["ten"]+` <br>
                                <strong>Size: S</strong> 
                            </div>
                            <div class="sp-3"> <p>`+cart[i]["gia"] +` VNĐ </p> </div>
                            <div class="sp-4">
                                        <div class="sl">
                                            <button onclick="tru(this,`+i+`)" class="tru" style="width: 25px; height: 25px; float: left;">-</button>
                                            <span>`+cart[i]["soluong"] +`</span>
                                            <button onclick="cong(this,`+i+`)"style="width: 25px; height: 25px; float: right;">+</button>
                                        </div>
                                    </div>
                            <div class="sp-5"> <p id="ttien" style="color: red;">`+ttien+` VNĐ</p> </div>
                        </div> <br>`;
                        
        }
        document.getElementById("thongtinsp").innerHTML = kq;
    }

}

function tru(x,i) {
    var vt = x.parentElement;
    var sl = parseInt(vt.childNodes[3].innerHTML)
    if (sl<=1) {
        alert("Không thể giảm");
    }else{
        var slmoi = sl-1;
        vt.childNodes[3].innerHTML = slmoi;
        giohang[i]["soluong"] = slmoi;
        // cập nhật tông tiền 1 sp
    var ttien = parseInt(giohang[i]["soluong"] * giohang[i]["gia"]);
    // //cập nhật lại cart trên localstorage
    localStorage.setItem("cart", JSON.stringify(giohang));
    // //gọi hàm tính tổng lại và gán lại cái tổng
    showcart();
    total();
    }
}


function cong(x,i) {
    //get soluong
    var vt = x.parentElement;
    var sl = parseInt(vt.childNodes[3].innerHTML)
    //++
    var slmoi = sl+1;
    // gán trở lại
    vt.childNodes[3].innerHTML = slmoi;
    //update vị trí x trong mảng với sln
    giohang[i]["soluong"] = slmoi;
    // cập nhật tông tiền 1 sp
    // var ttien = parseInt(giohang[i]["soluong"] * giohang[i]["gia"]);
    // //cập nhật lại cart trên localstorage
    localStorage.setItem("cart", JSON.stringify(giohang));
    // //gọi hàm tính tổng lại và gán lại cái tổng
    showcart();
    total();
}
// ---------------------------------------------------------------------------------

// Xóa ------------------------------------------------------------------------------
function xoatc() {
    localStorage.removeItem("cart");
    window.location="index.html";
}


function xoa(x) {
    var cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(x,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showcart();
    total();
    if (cart.length==0) {
        xoatc();
    }
}
//---------------------------------------------------------------------------------

// Tính tiền-----------------------------------------------------------------------
function total() {
    var cart = giohang;
    if(cart!= null){
        var total = 0;
        for (let i = 0; i < cart.length; i++) {
            var ttien = parseInt(cart[i]["gia"] * cart[i]["soluong"]);
                total += ttien;
        }
        //return total;
        document.getElementById("tonggiohang").innerHTML = total + ' VNĐ';
    }
}