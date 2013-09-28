@trusted
Feature: User can update their status from the trusted site
  
  Scenario: Authenticated user can update their status
    Given I am an authenticated user on the trusted site
    When I visit the trusted site
    And I update my status to be "My great status"
    Then my status should be "My great status"

  Scenario: Unauthenticated user cannot update their status
    Given I am an unauthenticated user on the trusted site
    When I visit the trusted site
    Then I should not be able to update my status

  Scenario: Unauthenticated user should not be able read their status
    Given I am an unauthenticated user on the trusted site
    When I visit the trusted site
    Then I should not be able to see my status