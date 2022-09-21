function Validation() {
  //METHOD CHECK BLANK
  this.checkBlank = function (value, divError) {
    if (value === "") {
      getEle(divError).innerHTML = "(*) Không để trống!";
      getEle(divError).style = "display: inline-block";
      return false;
    }
    getEle(divError).innerHTML = "";
    getEle(divError).style = "display: none";
    return true;
  };
  //METHOD CHECK LENGTH
  this.checkLen = function (value, minLen, maxLen, divError, message) {
    if (value.length >= minLen && value.length <= maxLen) {
      getEle(divError).innerHTML = "";
      getEle(divError).style = "display: none";
      return true;
    }
    getEle(divError).innerHTML = message;
    getEle(divError).style = "display: inline-block";
    return false;
  };
  //METHOD CHECK NAME (A-Za-z character)
  this.checkName = function (value, divError) {
    var validChar = new RegExp(
      "^[A-Za-z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$"
    ); //THIS REGEX ACCEPT VIETNAMESE CHARACTERS
    if (validChar.test(value)) {
      getEle(divError).innerHTML = "";
      getEle(divError).style = "display: none";
      return true;
    }
    getEle(divError).innerHTML = "(*) Vui lòng nhập mẫu ký tự A-z";
    getEle(divError).style = "display: inline-block";
    return false;
  };
  //METHOD CHECK MAIL (Include @ and .)
  this.checkEmail = function (value, divError) {
    var emailValid = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    ); //THIS REGEX ACCEPT IF VALUE CONTAINS '@' AND '.'
    if (emailValid.test(value)) {
      getEle(divError).innerHTML = "";
      getEle(divError).style = "display: none";
      return true;
    }
    getEle(divError).innerHTML = "(*) Email không hợp lệ";
    getEle(divError).style = "display: inline-block";
    return false;
  };
  //METHOD CHECK PASSWORD (Include at least 1 Uppercase, 1 lowercase and 1 special charater)
  this.checkPass = function (value, divError) {
    var validPass = new RegExp(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/
    );
    if (validPass.test(value)) {
      getEle(divError).innerHTML = "";
      getEle(divError).style = "display: none";
      return true;
    }
    getEle(divError).innerHTML =
      "(*) 6-10 ký tự, có in hoa, số và ký tự đặt biệt";
    getEle(divError).style = "display: inline-block";
    return false;
  };
  //METHOD CHECK DATE (dd/mm/yyyy format)
  this.checkDate = function (value, divError) {
    var validDate = new RegExp(
      /^(?:(?:(?:(?:0[1-9]|1[0-9]|2[0-8])[\/](?:0[1-9]|1[012]))|(?:(?:29|30|31)[\/](?:0[13578]|1[02]))|(?:(?:29|30)[\/](?:0[4,6,9]|11)))[\/](?:19|[2-9][0-9])\d\d)|(?:29[\/]02[\/](?:19|[2-9][0-9])(?:00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96))$/
    );
    if (validDate.test(value)) {
      getEle(divError).innerHTML = "";
      getEle(divError).style = "display: none";
      return true;
    }
    getEle(divError).innerHTML = "(*) Ngày không hợp lệ";
    getEle(divError).style = "display: inline-block";
    return false;
  };
  // METHOD CHECK BASE SALARY (range: 1e6 - 2e7)
  this.checkBaseSalary = function (value, minSalary, maxSalary, divError) {
    if (value >= minSalary && value <= maxSalary) {
      getEle(divError).innerHTML = "";
      getEle(divError).style = "display: none";
      return true;
    }
    getEle(divError).innerHTML = "(*) Lương: 1,000,000 - 20,000,000";
    getEle(divError).style = "display: inline-block";
    return false;
  };
  // METHOD CHECK POSITION (Should be selected)
  this.checkPosition = function (value, divError) {
    if (value !== "Chọn chức vụ") {
      getEle(divError).innerHTML = "";
      getEle(divError).style = "display: none";
      return true;
    }
    getEle(divError).innerHTML = "(*) Vui lòng chọn chức vụ";
    getEle(divError).style = "display: inline-block";
    return false;
  };
}
$("#password").tooltip({ trigger: "focus", title: "Password tooltip" });
