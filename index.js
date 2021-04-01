/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(employee) {
    return {
        firstName: `${employee[0]}`,
        familyName: `${employee[1]}`,
        title: `${employee[2]}`,
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArray){
    return employeeArray.map(createEmployeeRecord)
}

let createTimeInEvent = function(dateTime) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateTime.split(" ")[1]),
        date: dateTime.split(" ")[0]
    })
    return this
}

let createTimeOutEvent = function(dateTime) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTime.split(" ")[1]),
        date: dateTime.split(" ")[0]
    })
    return this
}

let hoursWorkedOnDate = function(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date)
    const timeOut = this.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour-timeIn.hour)/100
}

let wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date)*this.payPerHour
}

let payrollExpense = function() {

}

let findEmployeeByFirstName = function(empArr, nameString) {
    const employee = empArr.find(employee => employee.firstName === nameString)
    return employee
}

function calculatePayroll(employeeArray) {
    const wageArray = employeeArray.map(employee => allWagesFor.call(employee))
    return wageArray.reduce(function(total, wage) {
        return total = total + wage
        }, 0)
}