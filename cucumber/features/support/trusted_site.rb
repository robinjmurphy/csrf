module TrustedSite
  BASE_URL = 'http://localhost:3000'

  def trusted_home_page
    BASE_URL + '/'
  end

  def status_text
    page.find(:css, '.status-text').text
  end
end