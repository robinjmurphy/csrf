World(TrustedSite)

Given(/^I am an authenticated user on the trusted site$/) do
  visit trusted_home_page
  click_button 'Authenticate'
  page.should have_content('You are currently authenticated')
end

When(/^I visit the trusted site$/) do
  visit trusted_home_page
end

When(/^I update my status to be "(.*?)"$/) do |status|
  visit trusted_home_page
  fill_in('status', :with => status)
  click_button 'Update status'
end

Then(/^my status should be "(.*?)"$/) do |status|
  visit trusted_home_page
  status_text.should == status
end

Given(/^I am an unauthenticated user on the trusted site$/) do
  visit trusted_home_page
  if page.has_content?('You are currently authenticated')
    click_button 'Unauthenticate'
  end
end

Then(/^I should not be able to update my status$/) do
  page.should_not have_content 'Your status'
end

Then(/^I should not be able to see my status$/) do
  page.should_not have_content 'Update status'
end

When(/^I return to the trusted site$/) do
  visit trusted_home_page
end

Then(/^my status should not be "(.*?)"$/) do |status|
  visit trusted_home_page
  status_text.should_not == status
end