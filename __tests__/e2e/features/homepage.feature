# And example of a feature file for the home page using Cucumber
Feature: Download CV
  Scenario: Download CV
    Given the user is on the "https:\/\/bangsluke-portfolio.netlify.app/" page
    When the user clicks the "Download CV" button
    Then the user should be navigated to the "https:\/\/bangsluke-portfolio.netlify.app/Luke-Bangs-CV.pdf" page