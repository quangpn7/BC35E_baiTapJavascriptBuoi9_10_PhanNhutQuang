//Function create STAFF FRAME
function CreateStaff(
  _staffAccount,
  _staffName,
  _staffMail,
  _staffPass,
  _staffStartDate,
  _staffBaseSalary,
  _staffPosition,
  _staffTime
) {
  //ATTRIBUTES
  this.staffAccount = _staffAccount;
  this.staffName = _staffName;
  this.staffMail = _staffMail;
  this.staffPass = _staffPass;
  this.staffStartDate = _staffStartDate;
  this.staffBaseSalary = _staffBaseSalary;
  this.staffPosition = _staffPosition;
  this.staffTime = _staffTime;
  this.staffSalary = 0;
  this.staffRanking = "";
  //METHODS
  //SALARY CALC
  this.staffCalcSalary = function () {
    var staffX = 1;
    if (this.staffPosition === "Sếp") {
      staffX = 3;
    } else if (this.staffPosition === "Trưởng phòng") {
      staffX = 2;
    }
    this.staffSalary = (
      parseFloat(this.staffBaseSalary) * staffX
    ).toLocaleString();
  };
  //RANKING STAFF
  this.staffRank = function () {
    if (this.staffTime >= 192) {
      this.staffRanking = "Xuất sắc";
    } else if (this.staffTime >= 176) {
      this.staffRanking = "Giỏi";
    } else if (this.staffTime >= 160) {
      this.staffRanking = "Khá";
    } else {
      this.staffRanking = "Trung bình";
    }
  };
}
