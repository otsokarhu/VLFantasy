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
    const user2 = {
      name: 'Testi Testaus',
      username: 'testi2',
      email: 'sposti@testi.com',
      password: 'testi1234',
    };
    cy.request('POST', 'http://localhost:4004/api/VLusers', user2);
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
      cy.register(
        'Testit',
        'Testaajat',
        'testi1',
        'testaus@testi.com',
        'testi1234'
      );
      cy.contains('Rekisteröityminen onnistui');
    });

    it('registering new user with existing username fails', () => {
      cy.register(
        'Testit',
        'Testaajat',
        'testi',
        'testaus@testi.com',
        'testi1234'
      );
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
      cy.login('testi', 'testi123');
      cy.contains('Kirjautuminen onnistui');
    });

    it('logging in with wrong password fails', () => {
      cy.login('testi', 'testi1234');
      cy.contains('Kirjautuminen epäonnistui');
    });

    it('logging in with wrong username fails', () => {
      cy.login('testi1', 'testi123');
      cy.contains('Kirjautuminen epäonnistui');
    });
  });

  describe('logged in tests', () => {
    beforeEach(() => {
      cy.login('testi', 'testi123');
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
      cy.login('testi', 'testi123');
      cy.contains('Kirjautuminen onnistui');
    });

    it('visiting team-page without team', () => {
      cy.contains('Luo joukkue').click();
      cy.url().should('include', '/teamPage');
      cy.contains('luo joukkueesi!');
    });

    it('creating team', () => {
      cy.createTeam('Testijoukkue');
      cy.contains('Joukkue luotu');
    });

    it('cannot create two teams with one user', () => {
      cy.createTeam('Testijoukkue');
      cy.contains('Joukkue luotu');
      cy.get('button[aria-label="HomeButton"]').click();
      cy.contains('Luo joukkue').click();
      cy.url().should('include', '/teamPage');
      cy.contains('Juoksijoita valittavana');
      cy.contains('Testijoukkue:');
    });

    it('different users can create teams', () => {
      cy.createTeam('Testijoukkue');
      cy.contains('Joukkue luotu');
      cy.wait(6000);
      cy.contains('Kirjaudu ulos').click();
      cy.login('testi2', 'testi1234');
      cy.contains('Kirjautuminen onnistui');
      cy.createTeam('Testijoukkue2');
      cy.contains('Joukkue luotu');
    });
  });

  describe('runners to team', () => {
    beforeEach(() => {
      cy.login('testi', 'testi123');
      cy.contains('Kirjautuminen onnistui');
      cy.createTeam('Testijoukkue');
      cy.contains('Joukkue luotu');
      cy.get('button[aria-label="HomeButton"]').click();
    });
    it('adding runners to team', () => {
      cy.contains('Luo joukkue').click();
      cy.url().should('include', '/teamPage');
      cy.contains('Testijoukkue:');
      cy.contains('Juoksijoita valittavana');
      cy.contains('button', 'Lisää joukkueeseen').click();
      cy.contains('lisätty joukkueeseen');
    });
    it('adding runners to team and removing them', () => {
      cy.contains('Luo joukkue').click();
      cy.url().should('include', '/teamPage');
      cy.contains('Testijoukkue:');
      cy.contains('Juoksijoita valittavana');
      cy.contains('button', 'Lisää joukkueeseen').click();
      cy.contains('lisätty joukkueeseen');
      cy.contains('button', 'Poista joukkueesta').click();
      cy.contains('poistettu joukkueesta');
    });
    it('can not add existing team runner to team', () => {
      cy.contains('Luo joukkue').click();
      cy.url().should('include', '/teamPage');
      cy.contains('Testijoukkue:');
      cy.contains('Juoksijoita valittavana');
      cy.contains('button', 'Lisää joukkueeseen').click();
      cy.contains('lisätty joukkueeseen');
      cy.should('not.contain', 'Lisää joukkueeseen');
    });
    it('can not add more than 5 runners to team', () => {
      cy.contains('Luo joukkue').click();
      cy.url().should('include', '/teamPage');
      cy.contains('Testijoukkue:');
      cy.contains('Juoksijoita valittavana');
      cy.get('button[aria-label="AddToTeam"]').eq(0).click();
      cy.contains('lisätty joukkueeseen');
      cy.get('button[aria-label="AddToTeam"]').eq(1).click();
      cy.contains('lisätty joukkueeseen');
      cy.get('button[aria-label="AddToTeam"]').eq(2).click();
      cy.contains('lisätty joukkueeseen');
      cy.get('button[aria-label="AddToTeam"]').eq(3).click();
      cy.contains('lisätty joukkueeseen');
      cy.get('button[aria-label="AddToTeam"]').eq(4).click();
      cy.contains('lisätty joukkueeseen');
      cy.get('button[aria-label="AddToTeam"]').eq(6).click();
      cy.contains('Joukkueessasi on jo 5 juoksijaa');
    });
    it('can not add more than your budget', () => {
      cy.contains('Luo joukkue').click();
      cy.url().should('include', '/teamPage');
      cy.contains('Testijoukkue:');
      cy.contains('Juoksijoita valittavana');
      cy.get('button[aria-label="AddToTeam"]').eq(5).click();
      cy.contains('lisätty joukkueeseen');
      cy.get('button[aria-label="AddToTeam"]').eq(0).click();
      cy.contains('Joukkueen kokonaisbudjetti ylittyy');
    });
  });
});
