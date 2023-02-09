@regression
Feature: Regression : Search Employee 
    Scenario Outline: As a tester I want to perform the regression test on OrangeHRM UI
        Given User launches Orange HRM
        Then <userName> logs-in with <password>
        Then Dashboard should be displayed
        Then User navigates to PIM link and Employee List link
        Then User search for employee <employeeName>

    Examples:
    |userName|password|employeeName|
    |Admin|U2FsdGVkX18EddpaS7gZW6g2JZ2tI+nDIESq+4aoSOA=|Test Test1|