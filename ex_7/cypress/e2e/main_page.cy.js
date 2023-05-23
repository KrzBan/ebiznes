context('cypress.io - MainPage', () => {
  beforeEach(() => {
    cy.visit('https://www.cypress.io/')
  });

  describe('First section', () => {
    it('should contain welcome text', () => {
      cy.get('section').first()
        .should('contain.text', 'Test.')
        .and('contain.text', 'Automate.')
        .and('contain.text', 'Accelerate.')
    })

    it('should contain npm install button', () => {
      cy.get('section').first()
        .find('button').first()
        .should('contain.text', 'npm install cypress')
    })

    it('should contain Documentation button', () => {
      cy.get('section').first()
        .find('a').first()
        .should('contain.text', 'Documentation')
    })

    it('should contain video', () => {
      cy.get('section').first()
        .find('video').first()
    })

    it('should contain banner with clients', () => {
      cy.get('section').first()
        .find('.swiper-wrapper')
    })
  })

  describe('Second section', () => {
    it('should contain welcome text', () => {
      cy.get('section').eq(1)
        .should('contain.text', 'Introducing the Cypress App')
        .and('contain.text', 'Write, run, and debug like a pro')
    })

    it('should contain test in browser text', () => {
      cy.get('section').eq(1)
        .should('contain.text', 'Test modern apps directly in the browser')
        .and('contain.text', 'Watch your end-to-end and component tests run in real-time as you develop your applications. Cypress’s simple, yet powerful API runs as fast as your browser can render content.')
        .find('a')
        .should('contain.text', 'Learn more')
    })

    it('should contain test in minutes text', () => {
      cy.get('section').eq(1)
        .should('contain.text', 'Write your first passing test in minutes')
        .and('contain.text', 'Installing Cypress and writing your first passing test is a breeze. There are no servers, drivers, or other dependencies to install or configure.')
        .find('a')
        .should('contain.text', 'Learn more')
    })

    it('should contain debug in browser text', () => {
      cy.get('section').eq(1)
        .should('contain.text', 'Debug failures directly in the browser')
        .and('contain.text', 'Because Cypress runs directly in the browser, you can debug failed tests using the in-browser developer tools you already know and love.')
        .find('a')
        .should('contain.text', 'Learn more')
    })

    it('should contain eliminate flaky tests text', () => {
      cy.get('section').eq(1)
        .should('contain.text', 'Eliminate flaky tests with ease')
        .and('contain.text', 'Cypress deterministically interacts with your application the same way as your users so you can discover intermittent bugs before your users do.')
        .find('a')
        .should('contain.text', 'Learn more')
    })

    it('should contain integrate with CI text', () => {
      cy.get('section').eq(1)
        .should('contain.text', 'Integrate Cypress with any CI provider')
        .and('contain.text', 'Easily integrate Cypress with your current CI provider. Run Cypress in CI and you will know as soon as there is a failure. We make it simple to run in CI. Use our Docker images or bring your own.')
        .find('a')
        .should('contain.text', 'Learn more')
    })

  })

  describe('Third section', () => {
    it('should contain welcome text', () => {
      cy.get('section').eq(2)
        .should('contain.text', 'Introducing Cypress Cloud')
        .and('contain.text', 'Increase your productivity and confidence')
    })

    it('should contain optimize text', () => {
      cy.get('section').eq(2)
        .should('contain.text', 'Optimize your runs for a faster feedback loop')
        .and('contain.text', 'Run Cypress in your existing CI pipeline and use test parallelization, load balancing, spec prioritization, and more to be as efficient as possible with your available CI resources.')
        .find('a')
        .should('contain.text', 'Learn more')
    })

    it('should contain review and debug text', () => {
      cy.get('section').eq(2)
        .should('contain.text', 'Review and debug failures visually')
        .and('contain.text', 'Reach new levels of visibility into why your tests failed in CI. Play back videos of your tests as they failed, read friendly stack trace errors, and never guess why another test failed.')
        .find('a')
        .should('contain.text', 'Learn more')
    })

    it('should contain insights text', () => {
      cy.get('section').eq(2)
        .should('contain.text', 'Gain actionable insights into your test suite')
        .and('contain.text', 'Monitor your test suite’s health with in-depth analytics. Cypress surfaces failing and flaky test result trends and config changes that affect your test suite’s performance.')
        .find('a')
        .should('contain.text', 'Learn more')
    })

    it('should contain integrate workflow text', () => {
      cy.get('section').eq(2)
        .should('contain.text', 'Integrate seamlessly into your workflow')
        .and('contain.text', 'Plug Cypress into any CI pipeline and you can manage test results as a team thanks to native integrations with Slack, Teams, GitHub, GitLab, JIRA, and more.')
        .find('a')
        .should('contain.text', 'Learn more')
    })

  })
});

