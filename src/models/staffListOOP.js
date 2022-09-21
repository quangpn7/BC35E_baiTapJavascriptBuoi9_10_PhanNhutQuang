//CREATE FUNCTION STAFF LIST STORAGE
function StaffList() {
  //ATTRIBUTE
  this.staffListArr = [];
  //METHODS
  //#region GLOBAL METHODS
  //FUNCTION FIND INDEX
  this.findIndexStaff = function (staffAccount) {
    var index = -1;
    this.staffListArr.forEach(function (staff, i) {
      if (staff.staffAccount === staffAccount) {
        index = i;
      }
    });
    return index;
  };
  //FUNCTION GET ALL DETAIL
  this.getAllDetail = function (staffAccount) {
    var index = this.findIndexStaff(staffAccount);
    if (index !== -1) {
      return this.staffListArr[index];
    }
    return null;
  };

  //#endregion GLOBAL METHODS
  //FUNCTION ADD STAFF
  this.addStaff = function (staff) {
    this.staffListArr.push(staff);
  };
  //FUNCTION DELETE STAFF
  this.delStaff = function (staffAccount) {
    var index = this.findIndexStaff(staffAccount);

    if (index !== -1) {
      this.staffListArr.splice(index, 1);
    }
  };
  //FUNCTION UPDATE STAFF
  this.updateStaff = function (staff) {
    var index = this.findIndexStaff(staff.staffAccount);

    if (index !== -1) {
      this.staffListArr[index] = staff;
    }
  };
  //FUNCTION SEARCH STAFF BY RANK
  this.searchStaff = function (keyword) {
    var filteredList = [];
    this.staffListArr.forEach(function (staff) {
      var staffRanking = staff.staffRanking;

      if (staffRanking.indexOf(keyword) !== -1) {
        filteredList.push(staff);
      }
    });
    return filteredList;
  };
}
