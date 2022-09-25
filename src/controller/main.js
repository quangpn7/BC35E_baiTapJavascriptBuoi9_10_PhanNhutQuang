var staffList = new StaffList();
var validation = new Validation();
getLocalStorage();
//FUNCTION GET ELE
function getEle(id) {
  return document.getElementById(id);
}

//#region GLOBAL
//FUNCTION GET INPUT STAFF INFO
function getStaffInfo(isAdd) {
  var _staffAccount = getEle("tknv").value;
  var _staffName = getEle("name").value;
  var _staffMail = getEle("email").value;
  var _staffPass = getEle("password").value;
  var _staffStartDate = getEle("datepicker").value;
  var _staffBaseSalary = Number(getEle("luongCB").value.replace(/,/g, ""));

  var _staffPosition = getEle("chucvu").value;
  var _staffTime = getEle("gioLam").value;
  //CHECK VALIDATION
  var isValid = true;
  // CHECK ACCOUNT
  if (isAdd) {
    isValid &=
      validation.checkBlank(_staffAccount, "tbTKNV") &&
      validation.checkLen(
        _staffAccount,
        4,
        6,
        "tbTKNV",
        "(*) Độ dài 4-6 ký tự"
      ) &&
      validation.checkExisted(
        _staffAccount,
        "tbTKNV",
        "(*) Tài khoản đã tồn tại",
        staffList.staffListArr
      );
  }

  // CHECK NAME
  isValid &=
    validation.checkBlank(_staffName, "tbTen") &&
    validation.checkName(_staffName, "tbTen");

  // CHECK EMAIL
  isValid &=
    validation.checkBlank(_staffMail, "tbEmail") &&
    validation.checkEmail(_staffMail, "tbEmail");

  // CHECK PASSWORD
  isValid &=
    validation.checkBlank(_staffPass, "tbMatKhau") &&
    validation.checkPass(_staffPass, "tbMatKhau");

  // CHECK DATE
  isValid &=
    validation.checkBlank(_staffStartDate, "tbNgay") &&
    validation.checkDate(_staffStartDate, "tbNgay");

  // CHECK BASE SALARY
  if (_staffBaseSalary == 0) {
    _staffBaseSalary = "";
    isValid &= validation.checkBlank(_staffBaseSalary, "tbLuongCB");
  }

  isValid &= validation.checkBaseSalary(
    _staffBaseSalary,
    1e6,
    2e7,
    "tbLuongCB"
  );

  // CHECK POSITION
  isValid &= validation.checkSelect(
    "chucvu",
    "tbChucVu",
    "(*) Vui lòng chọn chức vụ"
  );
  // CHECK TIME
  isValid &= validation.checkBlank(_staffTime, "tbGiolam");
  //CREATE STAFF OBJECT
  if (isValid == true) {
    var staff = new CreateStaff(
      _staffAccount,
      _staffName,
      _staffMail,
      _staffPass,
      _staffStartDate,
      _staffBaseSalary,
      _staffPosition,
      _staffTime
    );
    staff.staffCalcSalary();
    staff.staffRank();
    return staff;
  }
  return null;
}
//FUNTION RENDER TABLE
function renderTable(data) {
  var content = "";
  data.forEach(function (staff) {
    content += `
        <tr>
            <th>${staff.staffAccount}</th>
            <th>${staff.staffName}</th>
            <th>${staff.staffMail}</th>
            <th>${staff.staffStartDate}</th>
            <th>${staff.staffPosition}</th>
            <th>${staff.staffSalary}</th>
            <th>${staff.staffRanking}</th>
            <th><button id="btnEdit" data-toggle="modal" onclick = "editStaff('${staff.staffAccount}')"data-target="#myModal" class="btn btn-success"><i class="fa fa-pencil"></i></button><button onclick="warningDel('${staff.staffName}','${staff.staffAccount}')" data-toggle = "modal" data-target="#warningModal" class="btn btn-danger"><i class="fa fa-trash"></i></button></th>
            
        </tr>
        `;
  });
  getEle("tableDanhSach").innerHTML = content;
}
//FUNCTION LOCAL SAVE
// 1. FUNCTION SAVE
function setLocalStorage() {
  var dataString = JSON.stringify(staffList.staffListArr);
  localStorage.setItem("staffList", dataString);
}
// 2. FUNCTION LOAD SAVE
function getLocalStorage() {
  if (localStorage.getItem("staffList")) {
    var dataString = localStorage.getItem("staffList");
    staffList.staffListArr = JSON.parse(dataString);
    renderTable(staffList.staffListArr);
  }
}
//FUNCTION RESET FORM
function resetForm() {
  //FORM
  getEle("tknv").value = "";
  getEle("name").value = "";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("datepicker").value = getDate();
  getEle("luongCB").value = "";
  getEle("chucvu").value = "Chọn chức vụ";
  getEle("gioLam").value = "";
  //SPAN ERROR
  getEle("tbTKNV").style = "display: none";
  getEle("tbTen").style = "display: none";
  getEle("tbMatKhau").style = "display: none";
  getEle("tbEmail").style = "display: none";
  getEle("tbNgay").style = "display: none";
  getEle("tbLuongCB").style = "display: none";
  getEle("tbChucVu").style = "display: none";
  getEle("tbGiolam").style = "display: none";
  //-----
  getEle("tbTKNV").innerHTML = "";
  getEle("tbTen").innerHTML = "";
  getEle("tbMatKhau").innerHTML = "";
  getEle("tbEmail").innerHTML = "";
  getEle("tbNgay").innerHTML = "";
  getEle("tbLuongCB").innerHTML = "";
  getEle("tbChucVu").innerHTML = "";
  getEle("tbGiolam").innerHTML = "";
}

//FUNCTION REMODALING INFO TAB

function reloadForm() {
  getEle("btnThemNV").style = "display: inline-block";
  getEle("tknv").disabled = false;
  document.querySelector("#myModal h2").innerHTML = "Log in";
  getEle("btnCapNhat").style = "display: none";
  resetForm();
}

//FUNTION NOTI
function popUpNoti(message) {
  getEle("successModal").classList.add("show");

  getEle("successModal").style = "display: block";
  getEle("modalSuccess").innerHTML = message;
}
function removePopUp() {
  getEle("modalSuccess").innerHTML = "";
  getEle("successModal").classList.remove("show");
  getEle("successModal").style = "display: none";
}
//#endregion GLOBAL
//----------------------------------
//#region MAIN FUNCTION
//FUNCTION ADD STAFF
getEle("btnThemNV").addEventListener("click", function () {
  var staff = getStaffInfo(true);
  if (staff !== null) {
    staffList.addStaff(staff);
    popUpNoti("Thêm nhân viên thành công!");
    resetForm();
  }
  renderTable(staffList.staffListArr);
  setLocalStorage();
});

//FUNCTION DELETE STAFF
function warningDel(staffName, staffAccount) {
  getEle("spanDel").innerHTML = `Xác nhận xoá nhân viên: ${staffName}`;
  getEle("delBtn").onclick = function deleteStaff() {
    staffList.delStaff(staffAccount);
    renderTable(staffList.staffListArr);
    setLocalStorage();
    popUpNoti("Xoá thành công!");
  };
}

//FUNCITON EDIT STAFF
//1. DISPLAY INFO
function editStaff(staffAccount) {
  //BUTTON DISPLAY
  resetForm();
  getEle("btnThemNV").style = "display: none";
  document.querySelector("#myModal h2").innerHTML = "Chỉnh sửa nhân viên";
  getEle("btnCapNhat").style = "display: inline-block";
  ///MAIN SCRIPT
  var staff = staffList.getAllDetail(staffAccount);
  getEle("tknv").value = staff.staffAccount;
  getEle("tknv").disabled = true;
  getEle("name").value = staff.staffName;
  getEle("email").value = staff.staffMail;
  getEle("password").value = staff.staffPass;
  getEle("datepicker").value = staff.staffStartDate;
  getEle("luongCB").value = staff.staffBaseSalary;
  getEle("chucvu").value = staff.staffPosition;
  getEle("gioLam").value = staff.staffTime;
}
//2. UPDATE
getEle("btnCapNhat").addEventListener("click", function () {
  var updatedStaff = getStaffInfo(false);
  if (updatedStaff !== null) {
    staffList.updateStaff(updatedStaff);
    renderTable(staffList.staffListArr);
    setLocalStorage();
    popUpNoti("Chỉnh sửa thành công!");
    resetForm();
  }
});

//FUNCTION SEARCHING BY RANK
document.getElementById("findRanking").addEventListener("change", function () {
  var keyword = getEle("findRanking").value;
  if (keyword == "Chọn xếp loại") {
    renderTable(staffList.staffListArr);
  } else {
    var filteredList = staffList.searchStaff(keyword);
    renderTable(filteredList);
  }
});
//#endregion MAIN FUNCTION
//ADDITIONAL FUNCTION FOR NUMBER INPUT
//AUTO ADD COMMA "," AFTER INPUT
function updateTextView(_obj) {
  var num = getNumber(_obj.val());
  if (num == 0) {
    _obj.val("");
  } else {
    _obj.val(num.toLocaleString());
  }
}
function getNumber(_str) {
  var arr = _str.split("");
  var out = new Array();
  for (var cnt = 0; cnt < arr.length; cnt++) {
    if (isNaN(arr[cnt]) == false) {
      out.push(arr[cnt]);
    }
  }
  return Number(out.join(""));
}
//AUTO RENDER COMMA WHEN TYPING
$(document).ready(function () {
  $("#luongCB").on("keyup", function () {
    updateTextView($(this));
  });
});
$("#luongCB").blur(function () {
  $(this).val(function (i, v) {
    return v.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });
});
