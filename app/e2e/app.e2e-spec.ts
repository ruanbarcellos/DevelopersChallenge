import { TournamentAppPage } from './app.po';

describe('tournament-app App', () => {
  let page: TournamentAppPage;

  beforeEach(() => {
    page = new TournamentAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
