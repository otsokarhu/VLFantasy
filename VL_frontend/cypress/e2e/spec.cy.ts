describe('VL-Fantasy', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:4004/api/testing/reset');
    const user = {
      name: 'Testi Testinen',
      username: 'testi',
      email: 'testisposti@testi.com',
      password: 'testi123',
    };
    cy.request('POST', 'http://localhost:4004/api/VLusers', user);
  });
  describe('general tests', () => {
    it('Visits VLFantasy', () => {
      cy.visit('/');
    });
  });

  describe('info-page', () => {
    it('info-page has correct url', () => {
      cy.visit('/');
      cy.contains('Tietoja').click();
      cy.url().should('include', '/info');
    });

    it('contains correct content', () => {
      cy.visit('/info');
      cy.contains('Tervetuloa ViestiLiigaan-Fantasyyn!');
    });

    it('closing info-page works', () => {
      cy.visit('/info');
      cy.get('button[aria-label="Close tab"]').click();
      cy.url().should('not.include', '/info');
    });
  });

  describe('home-page', () => {
    it('home-page has correct url', () => {
      cy.visit('/');
      cy.url().should('include', '/');
    });

    it('contains correct content when not logged in', () => {
      cy.visit('/');

      cy.contains('Luo oma VL-Fantasy-joukkueesi');
      cy.contains('Lue lisää Viestiliigasta');
      cy.contains('Tietoja');
      cy.contains('Rekisteröidy');
      cy.contains('Kirjaudu sisään');

      cy.contains('button', 'Luo joukkue');
      cy.contains('button', 'Viestiliigan sivuille');
      cy.get('button[aria-label="HomeButton"]');
    });
  });

  describe('register-page', () => {
    it('register-page has correct url', () => {
      cy.visit('/');
      cy.contains('Rekisteröidy').click();
      cy.url().should('include', '/signup');
    });

    it('contains correct content', () => {
      cy.visit('/signup');

      cy.contains('Rekisteröidy');
      cy.contains('Etunimi');
      cy.contains('Sukunimi');
      cy.contains('Käyttäjätunnus');
      cy.contains('Sähköpostiosoite');
      cy.contains('Salasana');
    });

    it('closing register-page works', () => {
      cy.visit('/signup');
      cy.get('button[aria-label="Close tab"]').click();
      cy.url().should('not.include', '/signup');
    });

    it('registering new user works', () => {
      cy.visit('/signup');

      cy.get('input[name="firstName"]').type('Testit');
      cy.get('input[name="lastName"]').type('Testaajat');
      cy.get('input[name="username"]').type('testi1');
      cy.get('input[name="email"]').type('testaus@testi.com');
      cy.get('input[name="password"]').type('testi1234');
      cy.get('button[type="submit"]').click();
      cy.contains('Rekisteröityminen onnistui');
    });

    it('registering new user with existing username fails', () => {
      cy.visit('/signup');

      cy.get('input[name="firstName"]').type('Testit');
      cy.get('input[name="lastName"]').type('Testaajat');
      cy.get('input[name="username"]').type('testi');
      cy.get('input[name="email"]').type('testaustest@testi.com');
      cy.get('input[name="password"]').type('testi1234');
      cy.get('button[type="submit"]').click();
      cy.contains('Rekisteröityminen epäonnistui');
    });
  });

  describe('login-page', () => {
    it('login-page has correct url', () => {
      cy.visit('/');
      cy.contains('Kirjaudu sisään').click();
      cy.url().should('include', '/login');
    });

    it('contains correct content', () => {
      cy.visit('/login');

      cy.contains('Kirjaudu sisään');
      cy.contains('Rekisteröidy');
      cy.contains('button', 'Kirjaudu sisään');
      cy.get('button[aria-label="Close tab"]');
    });

    it('closing login-page works', () => {
      cy.visit('/login');
      cy.get('button[aria-label="Close tab"]').click();
      cy.url().should('not.include', '/login');
    });

    it('logging in works', () => {
      cy.visit('/login');

      cy.get('input[name="username"]').type('testi');
      cy.get('input[name="password"]').type('testi123');
      cy.get('button[type="submit"]').click();
      cy.contains('Kirjautuminen onnistui');
    });

    it('logging in with wrong password fails', () => {
      cy.visit('/login');

      cy.get('input[name="username"]').type('testi');
      cy.get('input[name="password"]').type('testi12');
      cy.get('button[type="submit"]').click();
      cy.contains('Kirjautuminen epäonnistui');
    });

    it('logging in with wrong username fails', () => {
      cy.visit('/login');

      cy.get('input[name="username"]').type('testi1');
      cy.get('input[name="password"]').type('testi123');
      cy.get('button[type="submit"]').click();
      cy.contains('Kirjautuminen epäonnistui');
    });
  });

  describe('logged in tests', () => {
    beforeEach(() => {
      cy.visit('/login');

      cy.get('input[name="username"]').type('testi');
      cy.get('input[name="password"]').type('testi123');
      cy.get('button[type="submit"]').click();
      cy.contains('Kirjautuminen onnistui');
    });

    it('home-page has correct url', () => {
      cy.visit('/');
      cy.url().should('include', '/');
    });

    it('contains correct content when logged in', () => {
      cy.visit('/');

      cy.contains('Luo oma VL-Fantasy-joukkueesi');
      cy.contains('Lue lisää Viestiliigasta');
      cy.contains('Tietoja');
      cy.contains('Kirjaudu ulos');

      cy.contains('button', 'Luo joukkue');
      cy.contains('button', 'Viestiliigan sivuille');
      cy.get('button[aria-label="HomeButton"]');
    });
  });

  describe('team-page', () => {
    beforeEach(() => {
      cy.visit('/login');

      cy.get('input[name="username"]').type('testi');
      cy.get('input[name="password"]').type('testi123');
      cy.get('button[type="submit"]').click();
      cy.contains('Kirjautuminen onnistui');
    });

    it('visiting team-page without team', () => {
      cy.contains('Luo joukkue').click();
      cy.url().should('include', '/teamPage');
      cy.contains('luo joukkueesi!');
    });

    it('creating team', () => {
      cy.contains('Luo joukkue').click();
      cy.url().should('include', '/teamPage');
      cy.contains('luo joukkueesi!');
      cy.get('input[name="teamName"]').type('Testijoukkue');
      cy.contains('button', 'Luo joukkue').click();
      cy.contains('Joukkue luotu');
    });

    it('cannot create two teams with one user', () => {
      cy.contains('Luo joukkue').click();
      cy.url().should('include', '/teamPage');
      cy.contains('luo joukkueesi!');
      cy.get('input[name="teamName"]').type('Testijoukkue');
      cy.contains('button', 'Luo joukkue').click();
      cy.get('button[aria-label="HomeButton"]').click();
      cy.contains('Luo joukkue').click();
      cy.url().should('include', '/teamPage');
      cy.contains('Juoksijoita valittavana');
      cy.contains('Testijoukkue:');
    });
  });
});
