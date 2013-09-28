World(DodgySite)

When(/^I visit the dodgy site$/) do
  visit dodgy_home_page
end

When(/^I click on the amazing offer button$/) do
  visit dodgy_home_page
  click_button 'Click here for an amazing offer'
end