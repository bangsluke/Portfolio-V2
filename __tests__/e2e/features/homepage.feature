# And example of a feature file for the home page using Cucumber
Feature: View CV
  Scenario: View CV
    Given the user is on the "https:\/\/bangsluke-portfolio.netlify.app/" page
    When the user clicks the "View CV" button
    Then the user should be navigated to the "https:\/\/bangsluke-portfolio.netlify.app/Luke-Bangs-CV.pdf" page