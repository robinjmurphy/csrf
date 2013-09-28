@dodgy
Feature: User cannot update their status from the dodgy site

  Scenario: Authenticated user cannot be tricked into updating their status
    Given I am an authenticated user on the trusted site
    When I visit the dodgy site
    And I click on the amazing offer button
    And I return to the trusted site
    Then my status should not be "Hello CSRF"