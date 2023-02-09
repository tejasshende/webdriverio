@regression
Feature: Regression : Add Employee
    Scenario Outline: As a tester I want to perform the regression test on OrangeHRM UI
        Given User launches Orange HRM UI
        Then <userName> logsin with <password>
        Then Dashboard page should be displayed
        Then User navigates to PIM link and Add Employee link then Add Employee page displayed
        Then User adds new employee

    Examples:
        |userName|password|
        |Admin|U2FsdGVkX18EddpaS7gZW6g2JZ2tI+nDIESq+4aoSOA=|